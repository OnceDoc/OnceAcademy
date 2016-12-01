# OnceAcademy
### Lesson 15 - 用 Redis 储存 Session    

如果把 Session 存储在服务器内存里，有大量用户登陆时服务器的内存会急剧增加，而且存储在不同服务器的内存中的 Session 无法共享，导致集群无法实现。为了解决这两个问题，OnceIO 使用了 Redis 来存储 Session。  
  
#### 流程说明

1. 客户端访问网页产生 Session，并将 Session ID 保存在 Cookie 中，于此同时服务器将 Session 缓存到 Redis 中；
2. 如果客户端执行了能使 Session 属性发生改变或被删除的操作，如退出登录，服务器会对 Redis 中 Session 做相应修改或删除。

#### 具体实现

将 Session 储存在 Redis 里的具体实现与 Lesson 12 中将 Session 储存在服务器内存中的具体实现非常相似，创建、修改和删除 Session 的接口都没有发生改变，启动 Session 和设置获取 Session 的步骤完全相同。  
  
将 Session 储存在 Redis 里时最大的两个的不同点一是服务器会用到 redis 这一 node 模块和 onceio 文件夹中的 redisstore.js 文件，因此在服务器文件开头除了 onceio.js 之外还需要 require 这两个文件（require 前请确保已经在服务器文件所在目录用 npm 安装好了 redis）；二是需要在服务器文件中创建一个 Redis 的 client 并设置用这个 client 储存 Session。  
  
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
