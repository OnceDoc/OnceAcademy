# OnceAcademy
### Lesson 13 - 模块    

一个网站通常会包含很多用于实现不同功能的页面，例如在 OnceDoc 网站的众多页面中，有实现博客功能的，有实现文件管理功能的，有实现产品介绍功能的，有实现团队权限管理的…… OnceIO 支持把实现某一特定功能的文件，包括 JavaScript 文件、CSS 文件、HTML 文件等，存放在一起组成一个功能模块，达到使文件存放更加有序，各功能模块独立性更强、模块重用、复写更方便。

#### 模块文件夹目录结构

以具有一个简单的用户登录项目为例。
项目中会有一个实现用户登录功能的 form 模块和实现用户登录后的欢迎界面的 user 模块。

两个模块文件夹中又分别有存放后端文件的 svr 文件夹和存放前端文件的 web 文件夹，web 文件夹中的文件有时还可进一步细分为 JavaScript 文件、CSS 文件、图片文件、网页文件等。再加上项目的主 web 目录和主程序，项目文件夹的结构如下图所示：
  
![项目文件夹结构][1]


#### 模块注册和模块路由

模块可通过 app.mod 方法进行注册。第一个参数是模块名称即路由地址前辍，第二个参数为映射的模板和静态资源文件存放地址，例如 form 模块的注册：

    /*
    regist form module
    */
    app.mod('form', './form/web')

此时所有以 /form 开头的http静态资源请求和模板文件都会被转向到 ./form/web 目录去获取，如图所示：

![模块路由][2]


#### 模块路由中的相对路径和绝对路径

模块路由的 render 方法会自动根据当前请求的地址前辍来判断从哪个模块中查找相应的模块文件，例如：

下面这段代码中的 'form.html'，会根据当前请求从 form 模块目录中查找，即 './form/web/form.html'；

    app.get('/form', function(req, res) {
        res.render('form.html')
    })

下面这段代码中的 '/form.html'，因为是绝对路径，则会从根web目录进行查找，即 './web/form.html'，访问时会因文件不存在报错:

    app.get('/form', function(req, res) {
        res.render('/form.html')
    })

模板文件也可以嵌套其它模块下的模板文件，只需使用以 '/' 开头的绝对路径即可，否则会从当前模板所在的模块目录下查找。例如引用 user 模块中的 user.html 模板。

    <!--#include="/user/user.html"-->

#### 具体代码

主程序的代码是这样的：（定义 app 变量时 home 属性被设置为 './web'，主程序中用到的所有路径都会以主 web 目录为起点开始查找）  

    var onceio = require('../onceio/onceio')
    var app = onceio({ home: './web' })

    require('./form/svr/form.js')
    require('./user/svr/user.js')

    app.get('/', function(req, res){
      res.render('main.html')
    })


因 form/user 模块也要使用 app 对象，代码中的 app 变量就需要设置为全局变量，让模块程序也可以引用，代码中还需要增加Session的支持和引用form/user模块主程序，修改后的代码如下:

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

form 模块的服务程序 form.js 代码如下：

    app.mod('form', './form/web')

    app.get('/form', function(req, res) {
      res.render('form.html')
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




[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/main_form_user.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/module_routing.png
