# OnceAcademy
### Lesson 2 - 安装、使用和更换模板引擎    
##### 一、安装模板引擎  

除了 OnceIO 的默认模板引擎 doT.js，在使用任何一种模板引擎之前都需要先用 cmd 在项目文件夹安装这种模板引擎。以使用 Git Bash 安装 EJS 为例，使用的命令是：  
    
    $ npm install ejs  
Git Bash 界面如下：

![Git Bash 界面][1]   

##### 二、使用模板引擎  

在项目文件夹中创建 websvr.js 文件，以使用 doT.js 模板引擎为例，websvr.js 的代码如下：  

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
    

OnceIO 的模板引擎接口与 Express 有一些不同，例如，在使用 pug 或 ETS 时，Express 中 require 函数的第一个参数为路径，而 OnceIO 中则为内容：  

    //Comparison between Express and OnceIO when using pug
    require('pug').__express(path, option)
    require('pug').render(content, option)

    // Comparison between Express and OnceIO when using EJS
    require('ejs').__express(path, option)
    require('ejs').render(content, option)

创建好服务器文件后，再在项目文件夹中创建一个模板文件 dot.tmpl，代码如下：  

    <!DOCTYPE html>
    <body>
      <h1> Hello, {{=it.username}} </h1>
    </body>
    </html>  

运行服务器，在浏览器中打开 localhost:8054/dot，得到以下结果：  
![浏览器效果][2]  
  
可以注意到，这个网页和 Lesson1 中的示例网页不同，它的内容是由前端文件和后端文件共同决定的，这就是使用了模板引擎的结果。
  
##### 三、更换模板引擎

OnceIO 支持所有 Node.js 模板引擎，您可以根据自己的需要或喜好更换模板引擎。  

例如，当您想使用 EJS 模板引擎时，可在项目文件夹中安装 EJS 后将 websvr.js 中的 app.get() 部分替换成：  

    app.engine('ejs', require('ejs').render)

    //example_ejs.ejs 是根据 EJS 格式要求修改原模板文件得到的新模板文件
    app.get('example_ejs', function(req, res) {
      res.render('example_ejs.ejs', {
          username: 'Kris'
      })
    })
当您想使用 pug 模板引擎时，可在项目文件夹中安装 pug 后将 websvr.js 中的 app.get() 部分替换成：   

    app.engine('pug', require('pug').render);

    //example_pug.pug 是根据 pug 格式要求修改原模板文件得到的新模板文件
    app.get('/example_pug', function(req, res) {
      res.render('example_pug.pug', {
          username: 'Kris'
        , youAreUsingPug: true
      })
    })






  [1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson2/install_ejs.png
  [2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson2/dot_webpage.png
