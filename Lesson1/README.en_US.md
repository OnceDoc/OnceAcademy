# OnceAcademy
### Lesson 1 - Build a simple web server
#### First step. Find the onceio folder under the oncedoc directory and copy it to the project folder. 
Path of onceio in oncedoc is shown below:

![path of onceio in oncedoc][1]  

#### Second step. Create a file named websvr.js in the project folder
websvr.js code is as follows：  

    var onceio = require("../onceio/onceio")

    var app = onceio({
      home: "./"
      , listDir: true
      , debug: true
      , sessionTimeout: 60 * 1000
    })
    
    app.get("/", function(req, res) {
      res.end('Hello, world')
    })

At first the server module will be acquired through 'require()'. In this example, the onceio folder is in the parent directory of the websvr.js file, therefore '../' is used. When the websvr.js file is in the same directory with the onceio folder, use './' in the command.

Then, a simple application is created and four properties are set, including:

*home* designates the main directory where the server operates.

*listDir* designates the power whether the app is capable to check the files under the directory. The default value is usually false in the released items.

*debug* determines the messages shown in the cmd board. When the debug value is true, the debug mode starts, all activities of the server will be shown; otherwise only the error message will be printed.

sessionTimeout sets the overdue time of the session, the "60 * 1000" in the example represents 1 second. 


#### Third step. Operate the server
Open cmd, use cd command to locate the project directory. Execute the node websvr.js command to operate the server.
![cmd effect][2]  
  
Open the localhost:8054 in the server to get the following result:
  
![webserver effect][3]  
  
Till now, a simple OnceIO server is built.

  [1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson1/onceio_path.png
  [2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson1/cmd.png
  [3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson1/webpage.png