# OnceAcademy
### Lesson 7 - Static file available 
 
In order to offer static resources, such as images, css files and JavaScript files, you could save the resources in specific folders, then use app.static('folder') to set it to static mode. So that, the resources can be delivered directly, without going through Middleware, Handler, dialog, POST and Cookie, so as to save bandwidth, lower latency and reduce server's pressure. Examplar code as follows:

    app.static('css')
    app.static('js')
    app.static('img')
    app.static('icon')
    app.static('fonts')
    app.static('/*/css')
    app.static('/*/js')
    app.static('/*/img')
    app.static('/*/icon')
    app.static('/*/fonts')

#### app.static() effect display

In the following code, the app.static is used on the root folder, therefore when visiting the localhost with the default interface, the middleware and Handler will not be executed. (app.static('/') is only shown here as an example. In real application, in order to avoid unexpected skip of Middleware, Handler, app.static() will not take the root folder as its parameter in common. Instead folders specific for static resource storage will be used, such as '/css', '/js', '/img' or so.)

    app.static('/')

    app.use(function(req, res) {
      console.log('MIDDLEWARE')
      req.filter.next()
    })

    app.get('/', function(req, res) {
      res.send('HANDLER')
    }
 
To operate the server, visit localhost in the default interface, the browser will display "Access forbidden!", console window effect shown as follows:
  
![console window effect with static][1]

If you delete app.static('/') and carry out the operation again, the browser will display "HANDLER", console window effect shown below:

  
![console window effect without static][2]
  


  




[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/static_console.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/no_static_console.png