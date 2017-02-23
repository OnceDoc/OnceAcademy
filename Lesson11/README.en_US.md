# OnceAcademy
### Lesson 11 - Cookie    

#### Cookie introduction

Cookie, proposed by W3C organization, was originally developed by the Netscape community. At present, Cookie has been a criterion, which is supported by all mainstream browsers like IE, Chrome, Netscape, Firefox, Opera and so on.


HTTP is a stateless protocol, where the server have no idea of the client's identity from the Internet connection, which brings in difficulty to the implementation of the interactive web application. Cookie is one of the technics to bypass the HTTP's stateless. Cookie is actually a short text message. The client (browser) sends request to the server, if the server needs to record the status of the user, it will send Cookie as the response header to the client. If the browser has enabled Cookie, it will save the Cookie and send it to the server together with the website requested when it sends the request again. The server can read the Cookie to recognize the user status and change the content of the Cookie based on needs.  
  
![Cookie working mechanism][1]
  
####  Cookie related settings

OnceIO employs res.cookies and req.cookies to store Cookie; Function res.cookie is used to set or delete Cookie, the examplary code as follows:

	//set Cookie
	res.cookie('sessionID', 1234, { domain: '', path: '/', httponly: true })

The third parameter of function res.cookie is optional: domain represents the domain name, where the Cookie takes effect, and its default value is the current domain name; path represent Cookie's local storage path, with current directory in default; Defaulted value of httponly is true, which stands for that Cookie can be used in HTTP protocol. Access to Cookie through JavaScript is impossible, which effectively prevents the XSS attack.


####  Set Cookie

	//set Cookie
	app.get('/set_cookie', function(req, res) {
		res.cookie('sessionID', 1234, { domain: '', path: '/', httponly: true })
		//equals to "res.cookie('sessionID', 1234)"
		res.send('<b>res.cookies:</b> ' + res.cookies)
	})

Operate the server, visit '/set_cookie' at the defaulted port to set Cookie, the browser displays as:
  
![browser effect of set_cookie][2]

The Network bar in the developer tools are shown below, 'Set-Cookie' in HTTP Header is the current setting of res.cookies:

![Network bar effect of set_cookie][3]  

####  Delete Cookie

	//delete Cookie
	app.get('/del_cookie', function(req, res) {
		res.cookie('sessionID', null)
		res.send('<b>res.cookies:</b> ' + res.cookies)
	})

访问 '/del_cookie' ，服务器通过把 Cookie 中 key 的 value 设为 null 并且把 Cookie 的过期时间设置过去的一个时间点让 Cookie 立即过期，实现删除 Cookie 的目的。浏览器开发人员工具中 Network 栏效果如下：  
 
Visit '/del_cookie', the server sets the value of the parameter key in Cookie to be null and sets the expiration time of the Cookie to be some time 

![Network bar effect with del_cookie ][4]  

####  Display Cookie

	//display request cookie
	app.get('/', function(req, res) {
		res.send('<b>req.cookies:</b> ' + req.cookies)
	})

After visiting '/set_cookie', visit '/' before deleting Cookies. Since Cookie is shared among localhost:8054, the req.cookies displayed on the browser is that set with '/set_cookie'.

![req.cookies after set_cookie][5]  
  
After visiting '/del_cookie', req.cookies will be deleted：  
  
![req.cookies after del_cookie][6] 





[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cookie/cookie_workflow.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cookie/set_cookie_browser.png
[3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cookie/set_cookie_network.png
[4]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cookie/del_cookie_network.png
[5]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cookie/req_cookies_after_set_cookie.png
[6]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cookie/req_cookies_after_del_cookie.png
