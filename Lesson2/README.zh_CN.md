# OnceAcademy
### Lesson 2 - 使用中间件（middleware）

OnceIO 是一个自身功能极简，完全由路由和中间件构成的 web 开发框架：一个 OnceIO 应用本质上就是在调用各种中间件和Handler。  
  
中间件是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)），并将应用的请求-响应循环传向下一个中间件。
  
一个应用的请求-响应循环如下图所示，由请求对象、响应对象、中间件和 handler 构成：  
  
![请求-响应循环][1]  

Handler 针对请求发出响应，循环终结于此，一个请求-响应循环只会由一个 handler处理；但每个请求在到达 handler 之前会依次经过许多中间件，NoceJS中的MiddlerWare与Java中的Filter和.NET中的HttpModule概念类似。一个请求-响应循环也可以不经过中间件，比如说静态文件就没有执行解析Session、登录认证中间件的必要。
  
中间件的功能包括：  
  
* 执行任何代码。  
* 修改请求和响应对象。  
* 终结请求-响应循环。
* 调用堆栈中的下一个中间件。  

如果当前中间件没有终结请求-响应循环，则必须调用 req.filter.next() 将控制权交给下一个中间件，否则请求就会挂起。  
  
下面我们将以 Lesson 1 中简单的 'Hello World' 应用为例，为其增加两个中间件：能在终端输出一条简单消息的 myLogger 和能在网页上显示 HTTP 请求的时间戳的 requestTime.  

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

![myLogger console效果][2]    

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
  
![requestTime 浏览器效果][3]  
  
我们在这里只演示了两个简单的中间件，事实上中间件的种类和功能非常多样，例如，app.use() 函数可以有多达三个参数：  

    app.use('/file', function(req, res) {
       var user = req.session.get('user')
       if (!user || !user.username) {
         res.end('No permission')
         return
       }

       res.cache(0)
       req.filter.next()

    }, { session: true })

其中第一个参数指定所有以“/file”开头的 URL（发起的请求）都会经过这个中间件；第三个参数指定这个中间件需要session支持。因为onceio的session对象可能是存放在数据库中的，从数据库获取session会有一定的性能损失，所以在设计时您可根据情况，比如说在用户界面、管理后台添加session解析支持。 

中间件能访问请求对象、响应对象、堆栈中下一个中间件和整个 OnceIO API，因此它的用法拥有无限的可能性。 








  [1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson2/request_response_circle.png
  [2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson2/myLogger_console.png
  [3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson2/requestTime_browser.png
