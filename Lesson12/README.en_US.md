# OnceAcademy
### Lesson 12 - Session    

#### Session Introduction

HTTP is a stateless protocol, meaning that the server has no idea about the client only from the Internet connection, which brings difficulty to the implementation to interactive Web application. Same as Cookie, Session is also a technic to bypass HTTP's stateless. However, different from saving the state infomation on the browser, Session saves the client state infomation on the server.

When the application sets up a Session for a client request, the server will first check whether the client's request contains a Session mark, namely SessionID. If a SessionID exists, it means the server has already set up a Session for this client and the server will search the corresponding Session based on the SessionID (if it cannot be found, a new one might be created); If the client's request doesn't contain SessionID, the server will create a new Session and a correlating SessionID. SessionID value should be a unrepeatable charset, whose generation rule is also hard to found and copy. The SessionID will be returned to the client for storage in the present response (usually it is written in Cookie, whereas written in URL is also allowed when Cookie is disabled).
  
Take an example of a Session recording a user's name, the process of Session taking effect is:
  
![Example of Session taking effect][1]  
  
####  Session related settings

##### sessionTimeout

Everytime the user refreshes the page or interacts with the backstage, the expiration time of the Session will be automatically updated as the sessionTimeout. sessionTimeout can be set during application definition with unit in ms and defaulted value of 1440000, that is 24 minutes.

##### sessionDir

It is the storage address of the Session file, set during the application definition with the default value of '', that is saving the Session file in the internal storage. When sessionDir is set as a valid address in the server HD, Session file will be saved in HD permanently and won't get lost even if the server is restarted. 

##### sessionDomain

sessionDomain property marks which domain the Session belongs to. It is usually set during application definition with the defaulted value of '', which is the current site.

##### sessionKey，sessionLength

SessionID is saved in Cookie in the form of key-value. sessionKey is the key of SessionID, while sessionLength is the length of the charset for value in SessionID. The two attributes can be set during appliation definition, default value of sessionKey and sessionLength are respectively '_wsid' and 36. When sessionLenght is 36, sessionID is unlikely to be repeated, thus it is almost impossible for a session to be kidnapped.

#### Enable Session

The Session object of OnceIo is disabled in default and can be enabled in middleware or handler through { session: true }.

	app.use('/', function(req, res){
	    req.filter.next()
	}, { session: true })

#### Set to acquire Session: req.session

While all Session objects are only valid in the current dialogue for the client, it needn't to configure all kinds of parameters like Cookie. All settings and acquirements are done on the object req.session, for example:

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
