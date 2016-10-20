# OnceAcademy
### Lesson 3 - 使用中间件（middleware）
OnceIO 是一个自身功能极简，完全由路由和中间件构成的 web 开发框架：一个 OnceIO 应用本质上就是在调用各种中间件。  
  
中间件是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）和应用的请求-响应循环中下一个中间件。  
  
中间件的功能包括：  
  
* 执行任何代码。  
* 修改请求和响应对象。  
* 终结请求-响应循环。
* 调用堆栈中的下一个中间件。  

如果当前中间件没有终结请求-响应循环，则必须调用 req.filter.next() 将控制权交给下一个中间件，否则请求就会挂起。  
  
下面我们将以 Lesson 1 中简单的 'Hello World' 应用为例，为其增加两个中间件：会在 console 输出一条简单消息的 myLogger 和会在网页上显示 HTTP 请求的时间戳的 requestTime.  

    var onceio = require('../onceio/onceio')
    var app = onceio()


    app.get('/', function(req, res) {
      res.end('Hello World!')
    })

##### 中间件函数 myLogger  

myLogger 函数会在 request 经过它时在 console 界面输出“LOGGED”。myLogger 函数的代码如下：  

    var myLogger = function(req, res) {
      console.log('LOGGED')
      req.filter.next()
    }  

把 myLogger 添加到应用中：  
    
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

每当应用收到请求时，它都会在终端输出“LOGGED”：  

![myLogger console效果][1]    

中间件的加载顺序很重要：中间件必须要被首先加载并且被首先执行，否则在请求到达中间件之前请求-响应循环就被终止了，中间件将不被执行。  

##### 中间件函数 requestTime
接下来，我们创建一个叫做 requestTime 的中间件函数：  

    var requestTime = function(req, res) {
      req.requestTime = Date.now()
      req.filter.next()
    }  

把 requestTime 添加到应用中：  
    
    var onceio = require('../onceio/onceio')
    var app = onceio()


    var requestTime = function(req, res) {
      req.requestTime = Date.now()
      req.filter.next()
    }

    app.use(requestTime)

    app.get('/', function(req, res) {
      var responseText = 'Hello World!<br>';
      responseText += '<small>Requested at: ' + req.requestTime + '</small>';
      res.send(responseText);
    })  

每当应用收到请求时，它都会在浏览器显示请求的时间戳：  

![requestTime 浏览器效果][2]  
  
中间件能访问请求对象、响应对象、堆栈中下一个中间件和整个 OnceIO API，因此它的用法拥有无限的可能性。 








  [1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson3/myLogger_console.png
  [2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson3/requestTime_browser.png
