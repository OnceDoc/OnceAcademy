# OnceAcademy
### Lesson 12 - Session（会话）    

#### Session 简介

HTTP 是一种无状态的协议，服务器单从网络连接上无从知道客户身份，这给交互式 Web 应用程序的实现带来了阻碍。Session 和 Cookie 一样，也是用来绕开 HTTP 的无状态性的手段之一，但与 Cookie 在客户端保存状态信息不同，Session 将用户的状态信息保存在服务器端。  
  
当应用程序需要为某个客户端的请求创建一个 Session 的时候，服务器会首先检查这个客户端的请求里是否已包含了一个 Session 标识，即 SessionID。如果已包含一个 SessionID，则说明服务器为此客户端创建过 Session，服务器就会把这个 SessionID 对应的 Session 检索出来使用（如果检索不到，可能会新建一个）；如果客户端请求不包含 SessionID，服务器就会为此客户端创建一个新的 Session 并且生成一个与此 Session 相关联的 SessionID。SessionID 的值应该是一个既不会重复，又不容易被找到规律以仿造的字符串。这个 SessionID 将在本次响应中被返回给客户端保存（常放在 Cookie 中返回，客户端 Cookie 禁用时也可放在 URL 中）。
  
以一个记录用户名字的 Session 为例，Session 生效的流程如下：  
  
![示例 Session 生效流程][1]  
  
####  Session 的相关设置

##### sessionTimeout

用户每次刷新页面或与后台交互后，Session 的过期时间都会被自动更新为 sessionTimeout。sessionTimeout 的值可以在定义应用程序时设置，单位为毫秒，默认值为 1440000，即 24 分钟。 

##### sessionDir

Session 文件的存放地址。可在定义应用程序时设置，一般设置为默认值 ''，即把 Session 文件存放在内存中。当 sessionDir 被设置为服务器硬盘中的有效地址时，Session 文件会被持久地保存在硬盘中，即使服务器重启也不会丢失。

##### sessionDomain

sessionDomain 属性标识了 Session 属于哪一个域名站点，可在定义应用程序时设置，一般设置为默认值 ''，即当前站点。

##### sessionKey，sessionLength

SessionID 是以 key-value 的格式保存在 Cookie 中的。sessionKey 就是 SessionID 的 key，而 sessionLength 就是  SessionID 的 value 的字符串长度。这两个属性都可在定义应用程序时设置，sessionKey 的默认值为 '_wsid'，sessionLength 的默认值为 36。sessionLength 为 36 时，sessionID 重复的可能性很小，因此 session 被劫持的可能性也很小。

#### 启用 Session

OnceIO 的 Session 对象默认是不启用的，可以在 middleware 或 handler 中通过 { session: true } 启用

	app.use('/', function(req, res){
	    req.filter.next()
	}, { session: true })

#### 设置获取 Session: req.session

因为 Session 对象对于客户端来讲仅在当前会话中有效，所以不需要像 Cookie 那样配置各种参数，所以设置和获取都在 req.session 对象上完成，如

    req.session.lastPage = '/c'
    console.log(req.session)


####  应用 Session 的示例代码

以下示例代码在定义应用程序时对 Session 的一些属性进行了设置：将 sessionTimeout 设置为了 10 * 1000，意味着如果页面在 10 秒内没有刷新，Session 就会过期；将 sessionDir 设置为了 'sessionStore'，意味着 Session 文件会被长期保存在服务器硬盘上的 sessionStore 文件夹中。  
  
以下代码还演示了 Session 记录用户状态的功能：用户每访问一个网页，req.session 对象的 lastpage 属性就会被更新，当服务器需要得知用户上一次访问的网页时，就能读取 Session 中记录的内容，得到相应信息。

	var onceio = require('../onceio/onceio')
	var app = onceio({ 
	    sessionTimeout : 10 * 1000 
	  , sessionDir     : 'sessionStore'
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
	        console.log('Last page was: ' + req.session.lastPage + '.')    
	    }

	    req.session.lastPage = '/c'
	    res.send('Welcome to c!')
	})

用户第一次访问时，req.session 中还没有 lastPage 属性，控制台不显示 “Last page was: ...”；之后访问时，控制台都能显示用户上次访问的网页，但如果两次访问的时间间隔超过我们设置的 sessionTimeout，Session 将失效，控制台无法显示用户上次访问的网页。以 aabcbb 的访问顺序为例（只有最后两次访问网页 b 的时间间隔超过了 10 秒），控制台显示内容如下，只有中间 4 次访问时控制台显示了用户上次访问的网页：  
  
![Session 示例代码控制台显示内容][2]
  
  



[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/session/session_workflow.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/session/example_console_display.png
