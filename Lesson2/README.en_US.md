# OnceAcademy
### Lesson 2 - Use middleware

OnceIO is a developing frame with minimizing self-functionality, consisting of router, middleware and Handler. A OnceIO app is essentially calling different middlewares and Handler.

Middleware is a function which can request object(req) and response obejct(res). A request-response loop in an app is shown below. It consists of request object, response object, middleware and handler. 
  
![req-res loop][1]  
 
 A req-res loop ends when the Handler responds to the request. A req-res loop is usually tackled with one handler. But every request has to go through many different middlewares before reaching the handler. Typical middlewares include Session, Security, Table analysis. MiddleWare in Notejs is similar as Filter in Java or Http Module in .NET. A req-res loop could be also without middleware, e.g. static CSS/JS documents don't need Session execution or  middleware authentication. 
 
Functionalities of the middleware include:

* execute any code
* change the request or response object
* end up a req-res loop
* call the next middleware in a stack

If the current middleware has not ended the req-res loop, the mastery is to be delivered to the next middleware with the function 'req.filter.next()', otherwise the request will be hanged up. 
   
Next we take the 'Hello World' in Lesson 1 as an example, to add two middlewares: *myLogger*, which could print a short message on the terminal and *requestTime*, which could print the HTTP request time on the website.

    var onceio = require('../onceio/onceio')
    var app = onceio()


    app.get('/', function(req, res) {
      res.end('Hello World!')
    })

##### Middleware function myLogger
myLogger function could output "LOGGED" on the console interface when it is requested. Code of myLogger function is as follows:

    var myLogger = function(req, res) {
      console.log('LOGGED')
      req.filter.next()
    }  
  
Add myLogger into the app:

    var onceio = require('../onceio/onceio')
    var app = onceio()


    var myLogger = function(req, res) {
      console.log('LOGGED')
      req.filter.next()
    }

    app.use(myLogger)

    app.get('/', function(req, res) {
      res.end('Hello World!')
    })  

Whenever the app receives the request, it will print "LOGGED" on the terminal:

![myLogger console effect][2]    
  
Sequence to add the middleware is essential: the middleware is to be loaded and executed at first. Otherwise, the middleware will be terminated before the request arrives and it will consequently not be executed.

##### middleware function requestTime

Next we create a middleware function named requestTime:

    var requestTime = function(req, res) {
      req.requestTime = Date.now()
      req.filter.next()
    }  

Add requestTime into the app:

    var onceio = require('../onceio/onceio')
    var app = onceio()


    var requestTime = function(req, res) {
      req.requestTime = Date.now()
      req.filter.next()
    }

    app.use(requestTime)

    app.get('/', function(req, res) {
      var responseText = 'Hello World!<br>'
      responseText += '<small>Requested at: ' + req.requestTime + '</small>'
      res.send(responseText)
    })  
  
Everytime a request is received, it will print the requested time stamp on the website:

![requestTime website effect][3]  
  
We only display two simple middleware cases. In fact, middleware has various typies and functions, such as app.use(), which has upto three parameters:

    app.use('/file', function(req, res) {
       var user = req.session.get('user')
       if (!user || !user.username) {
         res.end('No permission')
         return
       }

       res.cache(0)
       req.filter.next()

    }, { session: true })

The first parameter assigns that all URL, which begins with "/file" will go through this middleware; The third parameter indicates that the middleware needs support from session.  The onceio object session may be stored in the database and to acquire session from be database could result in performance loss in some extent. Therefore, according to the designation situation, you could add session analysis support, e.g. user interface or backstage management.

The middleware could visit the request object, response object, the next middleware in the stack and the whole OnceIO API. Hence, there is a variety of possibility in its usage.








  [1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson2/request_response_circle.png
  [2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson2/myLogger_console.png
  [3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson2/requestTime_browser.png
