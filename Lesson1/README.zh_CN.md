# OnceAcademy
### Lesson 1 - 搭建简单的 web 服务器    
#### 第一步、在 oncedoc 目录下找到 onceio 文件夹，复制到项目文件夹中。  

onceio 在 oncedoc 中路径如下图所示：  

![onceio 在 oncedoc 中路径][1]  

#### 第二步、在项目文件夹中创建 websvr.js 文件。  

websvr.js 代码如下：  

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

代码首先通过 require() 获取服务器模块，因为示例中 onceio 文件夹在 websvr.js 的上级目录，所以这里使用了 '../'。如果onceio在websvr.js在同级目录下，则使用'./'。

之后，代码创建了一个简单的应用程序并设置了应用程序4个属性的值：home 属性指定了服务器运行的主目录；listDir 属性指定 app 是否具有查看目录下文件的功能，这个属性的值在已发布的项目中通常为 false；debug 属性的值会影响 cmd 界面显示的信息，debug 为 true 时，调试模式开启，cmd 会显示服务器的所有活动，而当 debug 为 false 时，cmd 只会显示 error 提示；sessionTimeout 设置了 session 的过期时间，示例中的 "60 * 1000" 代表 1 秒钟。

 

#### 第三步、运行服务器。

打开 cmd，用 cd 命令定位到项目目录下，然后执行 node websvr.js 命令，即可运行服务器。  
  
![cmd 效果][2]  
  
在浏览器中打开 localhost:8054，得到以下结果：  
  
![浏览器效果][3]  
  
至此，一个简单的 OnceIO 服务器就搭建好了。


  [1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson1/onceio_path.png
  [2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson1/cmd.png
  [3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson1/webpage.png