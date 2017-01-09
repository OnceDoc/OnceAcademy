# OnceAcademy
### Lesson 4 - Template engine and MVC design mode

这一节主要介绍 [OnceIO](https://github.com/OnceDoc/onceio)（NodeJS）中模板引擎的使用。模板引擎是为了使用户界面与业务数据（内容）分离而产生的，模板引擎可以让（网站）程序实现界面与数据分离，在将数据填充到模板并最终生成HTML的过程中，天然就体现了 MVC 设计模式（Model-view-controller）。MVC 模式是一种动态的程序设计架构，用一种将业务逻辑、数据、界面显示分离的方法组织代码。简化后续对程序的修改和扩展，并且使程序的某一部分的重复利用成为可能。  
This section mainly introduces the usage of template engine in [OnceIO](https://github.com/OnceDoc/onceio)(NodeJS). The template engine is mainly for seperation of user interface and operation data(contents). It could  fill in the template with data to generate HTML, which represents the MVC(Model-view-controller)design mode naturelly.
![后端 MVC 示意图][1]

#### 模型（Model）  

模型用于封装与应用程序的业务逻辑相关的数据，在跟其他NodeJS框架一样，OnceIO 采用 JavaScript 原生对象 JSON 来表示 model。  
  
Model 可以在应用级别使用，成为在应用的整个生命期间都有效的全局变量，例如：  

    app.model({ title: 'test_page', debug: true }) 

也可以在 middleware 和 handler 中使用，成为只在当前请求-响应循环中有效的本地变量，例如：  

    app.use(function(req, res) {
      res.model({
          debug   : false
        , username: 'Kris'
      })
      req.filter.next()
    })

    app.get('/view', function(req, res) { 
      var userModel = { username: 'Rex' }
      res.render('model.html', userModel)
    })

在全局 model 和本地 model 同时存在时，两者会自动合并，如果其中有重复的属性，handler 中的 model 会覆盖 middleware 中的 model， 本地 model 中的属性会覆盖全局 model 中的。例如，当上面所有代码在服务器文件中同时存在时，userModel 会与 res.model 合并并且覆盖 res.model 中的 username 属性。然后两者合并产生的 model 会与 app.model 合并并且覆盖其中的 debug 属性。最后在 '/view' 路径下，各属性的值为：  
  
![模型 merge 浏览器显示效果][2]

#### 视图（View）  

视图用于有目的地显示数据，对应项目文件夹中的网页文件，例如文件夹中的 model.html。  
  
模板引擎能够将规定格式的模板代码转换为业务数据，因此我们可以使用模板引擎通过模型来改变视图。例如在下面的代码中，模型中 title、debug 和 username 属性的值会影响视图的显示内容。OnceIO 默认采用的是 [doT](https://github.com/olado/doT) 模板引擎, 其性能较好，规则也较为简单。当然您也以切换成你自己熟悉的模板引擎，如 EJS 和 PUG(jade)。

    <!DOCTYPE html>
    <html>
    <body>
      <h1> Title: {{=it.title}} </h1>
      <h1> Debug: {{=it.debug}} </h1>
      <h1> Username: {{=it.username}} </h1>
    </body>
    </html>
  
#### 控制器（Controller）

控制器用于控制应用程序的流程，处理事件并作出响应。它对应项目文件夹中的服务器文件，例如文件夹中的 websvr.js。  
  
我们可以通过控制器对模型进行操作，例如在以下代码中，控制器将 URL 参数赋值给模型 userModel 的属性 username，使用户能通过改变输入的地址来改变模型，进而改变视图，控制器通过 response 对象的 render 方法（res.render）将模型数据（userModel）填充进视图（model.html）渲染成真正的 HTML。  

    app.get('/view/user/:username', function(req, res) { 
      var userModel = { username: req.params.username }
      res.render('model.html', userModel)
    })


代码实现效果如下图：

![控制器示例效果 1][3]  
  
![控制器示例效果 2][4]





  [1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson4/MVC_process.png
  [2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson4/model_overwritten.png
  [3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson4/controller_example_1.png
  [4]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson4/controller_example_2.png
