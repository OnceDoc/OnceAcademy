# OnceAcademy
### Lesson 13 - 模块    

一个网站通常会包含很多用于实现不同功能的页面，例如在 OnceDoc 网站的众多页面中，有实现博客功能的，有实现文件管理功能的，有实现产品介绍功能的…… OnceIO 支持把实现某一特定功能的文件，包括 JavaScript 文件、CSS 文件、HTML 文件等，存放在一起组成一个功能模块，达到使文件存放更加有序，各功能模块独立性更强、模块重用、更新、Debug 更方便。

#### 模块文件夹目录结构

以具有一个简单的用户登录项目为例。
项目中会有一个实现用户登录功能的 form 模块和实现用户登录后的欢迎界面的 user 模块。

两个模块文件夹中又分别有存放后端文件的 svr 文件夹和存放前端文件的 web 文件夹，web 文件夹中的文件有时还可进一步细分为 JavaScript 文件、CSS 文件、图片文件、网页文件等。再加上项目的主 web 目录和主程序，项目文件夹的结构如下图所示：
  
![项目文件夹结构][1]


#### 模块注册和模块路由

模块可通过 app.mod 方法进行注册，第一个参数是模块名称和模块路由地址前辍。第二个参数为映射的模板和静态资源文件存放地址，例如 form 模块注册：

    /*
    regist form module
    */
    app.mod('form', './form/web')

此时所有以 /form 开头的http静态资源请求都会被转向到 ./form/web 目录去获取，如图所示：

![模块路由][2]



#### 具体代码

以一个最简单的主程序为例，如果没有其他功能模块，主程序的代码是这样的：（定义 app 变量时 home 属性被设置为 './web'，主程序中用到的所有路径都会以主 web 目录为起点开始查找）  

    var onceio = require('../onceio/onceio')

    require('./form/svr/form.js')
    require('./user/svr/user.js')

    app.get('/', function(req, res){
      res.render('main.html')
    })


如果增加一个填写、提交表单和一个向用户问好的功能模块，代码中的 app 变量就需要设置为全局变量，让模块程序也可以引用，代码中还需要增加调用模块程序的语句和Session的支持，修改后的代码如下:

    var onceio = require('../onceio/onceio')
    global.app = onceio({ home: './web' })


    require('./form/svr/form.js')
    require('./user/svr/user.js')


    //with session support
    app.use('/', function(req, res) {
      req.filter.next()
    }, { session: true })


    app.get('/', function(req, res){
      res.render('main.html')
    })

如果不考虑模块自身功能的实现，form 模块的服务器程序代码如下：

    app.mod('form', './form/web')

    app.get('/form', function(req, res) {
      res.render('form/form.html')
    })

    app.get('/form/login', function(req, res) {
      var loginUser = req.query

      if (loginUser.password == '123456') {
        req.session.user = loginUser
        res.redirect('/user')
      } else {
        res.send('bad login')
      }
    })

app.mod 语句对 form 模块进行了注册。注册完成后，服务器程序中出现的相对路径如果以 'form/' 或 './form/' 开头，'form/' 或 './form/' 会被替换成 './form/web'；绝对路径如果以 '/form' 开头，'/form' 会被替换为 '/form/web'；路由路径或中间件挂载路径如果以 '/form' 开头，其 callback 函数中不以任何模块的名称开头的相对路径会被加上 './form/web' 的开头，以模块名称开头的路径会依旧遵守前两条重定向规则，例如：

	app.get('/form', function(req, res) {
	    res.render('user/user.html')
	})

上面这段代码中的 'user/user.html' 会被替换为 './user/web/user.html'；

	app.get('/form', function(req, res) {
	    res.render('/user/user.html')
	})

上面这段代码中的 '/user/user.html' 则会被替换为 '/user/web/user.html'。







[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/main_form_user.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/module_routing.png
