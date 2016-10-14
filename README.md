# OnceAcademy
### Lesson1 - 用Once.io搭建简单的web服务器    
第一步、在oncedoc目录下找到onceio文件夹，复制到项目文件夹中。  

onceio在oncedoc中路径如下图所示：  
![onceio在oncedoc中路径][http://cn.oncedoc.com/file/view/blog_pics/onceio_path.png]   

第二步、在项目文件夹中新建websvr.js文件。  

websvr.js代码如下：  

    //import WebSvr module
    var onceio = require("../onceio/onceio");

    //Start the WebSvr, running at current folder, default port is 8054, directory browser enabled;
    //Trying at: http://localhost:8054
    var app = onceio({
      home: "./"
      , listDir: true
      , debug: true
      , sessionTimeout: 60 * 1000
    });
    
    app.get("/", function(req, res) {
      res.end('Hello, world')
    })

代码首先通过require()获取服务器模块，因为示例中onceio文件夹在websvr.js的上级目录，所以这里使用了”../".  

之后，代码创建了一个简单的应用程序并设置了应用程序4个属性的值：home属性指定了服务器运行的主目录；listDir属性指定app是否具有查看目录下文件的功能，这个属性的值在已发布的项目中通常为false；debug属性的值会影响cmd界面显示的信息，debug为true时，调试模式开启，cmd会显示服务器的所有活动，而当debug为false时，cmd只会显示error提示；sessionTimeout设置了session的过期时间，示例中的"60 * 1000"代表1秒钟。

 

第三步、运行服务器。

打开cmd，用cd命令定位到项目目录下，然后执行 node websvr.js 命令，即可运行服务器。
![cmd效果][http://cn.oncedoc.com/file/view/blog_pics/cmd.png]


在浏览器中打开 localhost:8054，得到以下结果：
![浏览器效果][http://cn.oncedoc.com/file/view/blog_pics/webpage.png]


至此，一个简单的Once.io服务器就搭建好了。
