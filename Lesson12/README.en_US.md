# OnceAcademy
### Lesson 12 - Session    

#### Session Introduction

HTTP is a stateless protocol, meaning that the server has no idea about the client only from the Internet connection, which brings difficulty to the implementation of interactive Web application. Same as Cookie, Session is also a method to bypass HTTP's stateless. However, different from saving the state information on the browser, Session saves the client's status information on the server.

When the application sets up a Session for a client request, the server will first check whether the client's request contains a Session mark, namely SessionID. If a SessionID exists, it means the server has already set up a Session for this client and the server will search the corresponding Session based on the SessionID (if not found, a new one will be created); If the client's request doesn't contain SessionID, the server will create a new Session and a correlating SessionID. SessionID value should be an unrepeatable charset, whose generation rule is also hard to find and imitate. The SessionID will be returned to the client for storage in the present response (usually it is written in Cookie, whereas written in URL is also allowed when Cookie is disabled).
  
Take an example of a Session recording a client's name, the process of Session taking effect is:
  
![Example of Session taking effect][1]  
  
####  Session related settings

##### sessionTimeout

Everytime the client refreshes the page or interacts with the backstage, the Session expiration time will be automatically updated as the sessionTimeout, which can be set during application definition, unit in ms and defaulted value of 1440000, that is 24 minutes.

##### sessionDir

It is the storage address of the Session file, set during the application definition with the defaulted value of '', that is saving the Session file in the internal storage. When sessionDir is set as a valid address in the server HD, Session file will be saved in HD permanently and won't get lost even if the server is restarted. 

##### sessionDomain

sessionDomain property marks which domain the Session belongs to. It is usually set during application definition with the defaulted value of '', which is the current site.

##### sessionKey，sessionLength

SessionID is saved in Cookie in the form of key-value. sessionKey is the key of SessionID, while sessionLength is the length of the charset for value in SessionID. The two properties can be set during appliation definition, default value of sessionKey and sessionLength are respectively '_wsid' and 36. When sessionLenght is 36, sessionID is unlikely to be repeated, thus it is almost impossible for a session to be kidnapped.

#### Enable Session

The Session object of OnceIo is disabled in default and can be enabled in middleware or handler through { session: true }.

	app.use('/', function(req, res){
	    req.filter.next()
	}, { session: true })

#### Set to acquire Session: req.session

While all Session objects are only valid in the current dialogue for the client, it needn't to configure all kinds of parameters like Cookie. All settings and acquirements are done on the object req.session, for example:

    req.session.lastPage = '/c'
    console.log(req.session)


####  Examplary code of applying Session

The following examplary code made some settings during application definition: set the sessionTimeout to be 10*1000, meaning that, if there is no refresh of the web page within 10s, Session will expire; set sessionDir to be 'sessionStore', meaning that Session file will be saved in the sessionStore file of server HD.

The following code displays the Session's function of client status documentation: everytime the client visits a web page, the property of req.session object lastpage will be updated. When the server needs to know the latest web page the client visited, it could get the corresponding information through reading the content in Session.

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


When the client visits for the first time, there is no lastpage property in req.session and the console doesn't show "Last page was:..."; For the visits afterwards, the console displays the web page the client visited last time. However, if the time interval exceeds the sessionTimeout set, Session will lose effect and the console can not show the page visited last time. Taking the aabcbb visiting sequence as an example(only the last two visit of web page b exceeds 10s), the console displays the pages visited last time for only 4 times and the console displays as:

  
![Console display with Session examplary code][2]
  
  



[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/session/session_workflow.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/session/example_console_display.png
