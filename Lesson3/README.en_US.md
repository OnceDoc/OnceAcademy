# OnceAcademy
### Lesson 3 - Install, usage and change template engine    
#### Install template engine  

Since the doT.js template engine has a overall better performance, OnceIO adopts doT.js as its default template engine. Before using any other template engine except doT.js, you have to install the template engine in the project folder, for example, to install EJS with Git Bash, the command is:
    
    $ npm install ejs  

Git Bash interface as follows：

![Git Bash Interface][1]   

#### Use template engine  
   
Create wersvr.js file in the project folder, with doT.js template engine as example, the websvr.js code is: 

    var onceio = require('../onceio/onceio')

    var app = onceio({
        home   :  "./"
      , port   :  8054
      , listDir:  true
      , debug  :  false
    })

    app.get('/dot', function(req, res) {
      res.render('dot.tmpl', {
        username: 'Kris'
      })
    })  
      
After building the server file, create one more template file dot.tmpl in the project file, code is as follows:

    <!DOCTYPE html>
    <html>
    <body>
      <h1> Hello, {{=it.username}} </h1>
    </body>
    </html>  

Input `node websvr.js` in the cmd window to operate the server and open up localhost:8054/dot in the browser to get the following result：  
  
![Browser Effect][2]  
  
You could notice that, different from the example in Lesson1, this website is determined by the front-end and backup files together.
#### Change template engine

OnceIO supports all Node.js template engine, you could change the template engine based on your preference and personal needs. 

For example, if you want to use EJS as your template engine, you could first install EJS and then substitute app.get function in websvr.js with:

    app.engine('ejs', require('ejs').render)

    app.get('example_ejs', function(req, res) {
      res.render('example_ejs.ejs', {
          username: 'Kris'
      })
    })
  
OnceIO template engine has different interface as  Express: when using EJS or pug, the first parameter of the function 'require' is the path in Express, but content in OnceIO：  

    // Comparison between Express and OnceIO when using EJS
    require('ejs').__express(path, option)
    require('ejs').render(content, option)

    //Comparison between Express and OnceIO when using pug
    require('pug').__express(path, option)
    require('pug').render(content, option)

Template file code in example_ejs.ejs :  
  
    <!DOCTYPE html>
    <html>
    <body>
      <h1> Hello, <%= username %> </h1>
    </body>
    </html>
    
When you want to use pug template engine, you could first install pug and then substitute app.get function in websvr.js with:

    app.engine('pug', require('pug').render)

    app.get('/example_pug', function(req, res) {
      res.render('example_pug.pug', {
          username: 'Kris'
        , youAreUsingPug: true
      })
    })
  
Template file code in example_pug.pug:  
  
    doctype html
    html
      body
        h1 Hello, #{username}





  [1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson3/install_ejs.png
  [2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson3/dot_webpage.png
