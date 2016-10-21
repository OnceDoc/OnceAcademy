# OnceAcademy
### Lesson 4 - MVC 模式      

OnceIO 是后端框架，它的架构采用了 MVC 模式（Model-view-controller）。MVC 模式是在 20 世纪 80 年代被发明出的一种软件架构，目的是实现一种动态的程序设计，简化后续对程序的修改和扩展，并且使程序的某一部分的重复利用成为可能。  
  
![后端 MVC 示意图][1]

##### 模型（Model）  

模型用于封装与应用程序的业务逻辑相关的数据，对应 OnceIO 中自带的 JavaScript 对象 model。  
  
Model 可以在 app 级别使用，成为在应用的整个生命期间都有效的全局变量，例如：   

    app.model({ title: 'test_page', debug: true }) 

也可以在 res 级别使用，成为只在请求-响应循环中有效的本地变量，例如：  

    app.use(function(req, res) {
      res.model.debug = false
      res.model.username = 'Kris'
      req.filter.next()
    })

    app.get('/', function(req, res) {
      res.render('model.html', { 
        username: 'Rex' 
      })
    })

在全局 model 和本地 model 同时存在时，两者会自动 merge，如果有重复的属性，本地 model 中的属性会覆盖全局 model 中的。例如，当以上代码在服务器文件中同时存在时，在 '/' 路径下，各属性的值为：  
  
![浏览器显示效果][2]

##### 视图（View）  

视图用于有目的地显示数据，对应项目文件夹中的网页文件，例如 Lesson 4 文件夹中的 model.html.
  
##### 控制器（Controller）

控制器用于控制应用程序的流程，处理事件并作出响应。它对应项目文件夹中的服务器文件，例如 Lesson 4 文件夹中的 websvr.js.






  [1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson4/MVC_process.png
  [2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson4/model_overwritten.png
  
