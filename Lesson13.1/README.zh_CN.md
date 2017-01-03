# OnceAcademy
### 模块路由拦截与数据填充改写

[OnceIO](https://github.com/OnceDoc/onceio) 的模块路由和模板注入机制是与其它Web框架最主要的区别之一。软件系统时常需要针对不同的客户定制不同的功能。OnceIO的模块路由可以通过一个扩展包，对系统原有模板(Template)和填充数据(Model)进行重定向或复写。可以在不更改系统源代码的情况下，以非侵入的方式对系统进行深度定制和扩展。

#### 项目组织结构

还是以一个简单的用户登录项目为例。项目中会有一个实现用户登录模块 form。还有一个功能复写模块 override。

override模块因仅用来复写form，因此没有专门的 web/css/js 文件夹。项目文件如图所示：

![module_override_folder](https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/module_override_folder.png)


#### 原有登录模块的实现

form 的登录页面模板为 form.html，它又引用了页头(head.html)和页脚(foot.html)模板文件。其中还会显示填充Model的title属性。

    <!DOCTYPE html>
    <html>
    <head>
      <link rel='stylesheet' href='/form/css/form.css'>
    </head>
    <body>
      <!--#include="head.html"-->
      <h1>Hello {{=it.title}}</h1>
      <form action='/form/login' method='get'>
        <p>Username: <input type='text' name='username' value='admin' /></p>
        <p>Password: <input type='text' name='password' value='123456' /></p>
        <input type='submit' value='Login' />
      </form>
      <!--#include="foot.html"-->
      <script src="/form/js/form.js"></script>
    </body>
    </html>

后台文件 form/svr/form.js。为了方便比较，这里注册了两个模块：form 和 form2，其中override模块会复写form2的Template模板和Model数据。这里还通过 app.model 为全局 Model 添加了 title 属性。

    /*
    regist form module
    */
    app.mod('form',   './form/web')
    app.mod('form2',  './form/web')

    //preload *.html
    app.pre('form', '.html')

    app.model({ title: 'Login form' })

    app.get(['/form', '/form2'], function(req, res) {
      res.render('form.html')
    })

    app.get('/form/login', function(req, res) {
      var loginUser = req.query

      if (loginUser.password == '123456') {
        req.session.user = loginUser
        res.send('login success')
      } else {
        res.send('bad login')
      }
    })

app.pre 等效于 app.preload  即告诉 onceio 预加载指定类型的模板文件。
运行后访问 localhost:8054/form 的界面是这样的：

![module_override_folder](https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/module_form.png)


#### 模块文件的路由重定向与复写

模块路由拦截改写是通过一个 middleware 中间件实现的，override 中声明的中间件会在form2的路由之前将所用到的Template模板文件进行重定向或者复写，并修改将向模板中填充的Model数据，form 和 form2 的路由过程如下图所示：


![module_override](https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/module_override.png)

这里使用 res.model 来复写全局 model 的属性，并使用 res.template 来对模板文件进行重定向或修改，override/main.js 代码如下所示：

    app.mod('override', './override')
    app.pre('override', '.html')

    app.use('/form2', function(req, res) {
      res.model({
        title : 'Title override'
      })

      res.template({
          'head.html': 'override/head.html'
        , 'foot.html': ''
      })

      req.filter.next()
    })

上段代码将 header.html 模板文件重定向到了 override/head.html。并删除了 foot.html 模板的内容（空字符串），即新的 /form2 将不会再显示页脚，最终效果如图所示：

![module_override_folder](https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/module_form_override.png)

模块的这种路由重写机制可以让我们以最小代价对现有系统进行深度定制，同时确保了在满足不同客户的定制要求时，系统核心代码的一致性。


附：示例源码[Github](https://github.com/OnceDoc/OnceAcademy/tree/master/Lesson13.1)
