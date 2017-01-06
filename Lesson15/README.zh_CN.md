# OnceAcademy
### Lesson 15 - 用 Redis 储存 Session    

单线程的 Node.js 为了充分利用 CPU 的多核特性，采用了 cluster 模块，利用主从模式，生成与 CPU 核心数量相当的子进程，主进程捕获请求随机分配给子进程处理，并负责子进程的崩溃重启。进程与进程之间是不能共享数据的，如果把 Session 存储在内存里，存储在不同进程的内存中的 Session 将无法共享，Session 认证机制会出现问题。例如，用户 A 认证的过程是由进程 1 处理的，那么维持会话的 Session 将保存在进程 1 的内存数据中；用户 A 接下来的请求被分配给进程 2 处理，因为进程 2 没有处理过用户 A 的认证，没有维持这个会话的 Session，所以进程 2 会判断用户 A 并没有授权。这样用户 A 需要多次重复认证访问才能继续下去。  
  
为了解决这个问题，OnceIO 使用了 Redis 数据库来存储 Session，不同进程可以通过访问同一数据库实现 Session 的共享。  
  
#### 流程说明

1. 客户端向服务器发起请求，主进程将这一请求随机分配给某一子进程处理，如处理过程中产生 Session，客户端将 SessionID 保存在 Cookie 中，于此同时子进程将 Session 缓存到 Redis 中；
2. 客户端向服务器发起一个包含 SessionID 的请求，主进程将这一请求随机分配给某一子进程处理，子进程把这一 SessionID 对应的 Session 从 Redis 中检索出来使用。

#### 使用接口

OnceIO 使用 app.sessionStore 来指定将 session 存储到何处。Session 的 Redis 存储是使用 redisstore.js 来实现。其中 client 是一个 redis 实例，第二个参数是 session 过期时间，单位为豪秒

    var redisstore    = OnceStore(client, 1000 * 1000)
    app.sessionStore  = redisstore

您也可以依照 redisstore.js 写法将 session 存放到 mongodb 或 mysql 中，只需要实现：get/set/del 三个接口即可。


#### 具体实现

将 Session 储存在 Redis 里的具体实现与 Lesson 12 中将 Session 储存在服务器内存中的具体实现非常相似，创建、修改和删除 Session 的接口都没有发生改变，启动 Session 和设置获取 Session 的步骤完全相同。  
  
将 Session 储存在 Redis 里的最大的两个的不同一是服务器会用到 redis 这一 node 模块和 onceio 文件夹中的 redisstore.js 文件，因此在服务器文件开头除了 onceio.js 之外还需要 require 这两个文件（require 前请确保已经在服务器文件所在目录用 npm 安装好了 redis）；二是需要在服务器文件中创建一个 Redis 的 client 并设置用这个 client 储存 Session。  
  
以下代码演示了如何用 Redis 储存 Session，并实现了用 Session 记录用户访问的上个网页的功能，用户每访问一个网页，req.session 对象的 lastpage 属性就会被更新，当服务器需要得知用户上一次访问的网页时，就能读取 Session 中记录的内容，得到相应信息：  

	var onceio    = require('../onceio/onceio')
	var OnceStore = require('../onceio/redisstore')
	var redis     = require('redis')

	var ONCEIO_CONFIG = { sessionTimeout : 1000 * 1000 } 
	// a Session can remain idle for 1000 seconds before the server terminates it automatically

	var app = onceio(ONCEIO_CONFIG)

	var client = redis.createClient()

	client.on('ready', function() {
	  var redisstore    = OnceStore(client, ONCEIO_CONFIG.sessionTimeout / 1000)
	  app.sessionStore  = redisstore
	})

	app.use('/', function(req, res){
	    req.filter.next()
	}, { session: true })

	app.get('/a', function(req, res){
	    if(req.session.lastPage) {
	        console.log('Last page was: ' + req.session.lastPage + '.')   
	    } 

	    req.session.lastPage = '/a' //Update session.lastPage everytime the webpage is visited
	    res.send('Welcome to a!')
	})

	app.get('/b', function(req, res){
	    if (req.session.lastPage) {
	        console.log('Last page was: ' + req.session.lastPage + '.')    
	    }

	    req.session.lastPage = '/b'  
	    res.send('Welcome to b!')
	})

	app.get('/c', function(req, res){
	    if (req.session.lastPage){
	        console.log("Last page was: " + req.session.lastPage + '.')    
	    }

	    req.session.lastPage = '/c'
	    res.send('Welcome to c!')
	})

例如，用户访问 ‘/a' 网页后，Redis 中的 Session 显示为：  
  
![Redis 中 Session 条目][1]
  
如果 Session 在 sessionTimeout 这一段时间内都没有活动，Redis 中储存的 Session 会被自动删除。
  
  



[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/redis_store_session/session_in_redis.png
