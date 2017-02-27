# OnceAcademy

### Module router interception and model modification

[OnceIO](https://github.com/OnceDoc/onceio) module router and template injection mechanism is its most essential difference from other web frame. The software system needs to customize different functions for different customers. OnceIO module router takes advantage of an extension package to carry out redirection or rewrite on the system original Template and Model. It could achieve deep customization and extension on the system through non-invasion method without changing the system source code. 

#### Project organization structure

Based on a simple example of a user login project, the project has a 'form' to realize user login, as well as a function rewrite module 'override'.

Since override module is only used to rewrite form, it has no specific web/css/js folder. The project file is as follows:

![module_override_folder](https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/module_override_folder.png)


#### Original login module realization

The login web page template of form is form.html, with citation of head.html and foot.html. Besides, it will also display the title property for filling in Model.

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

It is the backstage file form/svr/form.js. In order to facilitate comparison, two modules are registed here: form and form2. Module override will rewrite the Template and Model data. Here, the global Model is added with title property through app.model.

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

app.pre is equal with app.preload, which is to tell onceio to preload template file of certain type. Visit localhost:8054/form after operation, the web page is as follows:

![module_override_folder](https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/module_form.png)

#### Router redirection and rewrite of module file

Module router interception and rewrite is realized through a middleware. The middleware defined in override will redirect and rewrite all the Templated files it used before form2 router, meanwhile it will modify the Model data to be filled in the template. The routering process of form and form2 is as follows:

![module_override](https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/module_override.png)

Here res.model is applied to rewrite the property of global model and res.template is used  for template file redirection and modification. Code of override/main.js is as follows:

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

The code above redirects the header.html template file to override/head.html, and deletes the content of foot.html (empty charset), which means the new /form2 will not display the footer anymore. Final effect as follows:

![module_override_folder](https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/module_form_override.png)

The module's router rewrite mechanism helps to realize deep customization on the current system with minimum cost. At the same time, it guarantees the consistency of the essential code while satisfying different customization demands from the customers.

Attachment: source code[Github](https://github.com/OnceDoc/OnceAcademy/tree/master/Lesson13.1)
