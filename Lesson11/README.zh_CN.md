# OnceAcademy
### Lesson 11 - Cookie    

#### Cookie 简介

Cookie 意为“甜饼”，是由 W3C 组织提出，最早由Netscape社区发展的一种机制。目前Cookie已经成为标准，所有的主流浏览器如IE、Chrome、Netscape、Firefox、Opera等都支持Cookie。  
  
HTTP 是一种无状态的协议，服务器单从网络连接上无从知道客户身份，这给交互式 Web 应用程序的实现带来了阻碍。Cookie 就是用来绕开 HTTP 的无状态性的手段之一。Cookie 实际上是一小段的文本信息。客户端（浏览器）向服务器发送请求，如果 服务器需要记录该用户状态，就会将 Cookie 放在响应头中向客户端浏览器发送。如果浏览器启用了 Cookie，就会把 Cookie 保存起来，并且在再次请求该网站时把请求的网址连同 Cookie 一同提交给服务器。服务器通过读取 Cookie 来辨认用户状态。服务器还可以根据需要修改 Cookie 的内容。  
  
![Cookie 工作机制][1]
  
####  Cookie 的相关设置

OnceIO 使用 res.cookies 和 req.cookies 对象储存 Cookie；用 res.cookie 函数设置或删除 Cookie，示例代码如下：

	//set Cookie
	res.cookie('sessionID', 1234, { domain: '', path: '/', httponly: true })

res.cookie 函数的第三个参数是可选的，其中 domain 代表 Cookie 生效的域名，默认为当前域名；path 代表 Cookie 在本地的储存路径，默认为当前目录；httponly 默认值为 true，代表 Cookie 只能在 HTTP 协议中使用，通过 JavaScript 脚本将无法读取到 Cookie，这样能有效地防止 XSS 攻击。

####  设置Cookie

	//set Cookie
	app.get('/set_cookie', function(req, res) {
		res.cookie('sessionID', 1234, { domain: '', path: '/', httponly: true })
		//equals to "res.cookie('sessionID', 1234)"
		res.send('<b>res.cookies:</b> ' + res.cookies)
	})

运行服务器，在默认端口访问 '/set_cookie' 设置 Cookie，浏览器显示效果如下：  
  
![set_cookie 浏览器显示效果][2]

####  显示Cookie

	//display request cookie
	app.get('/', function(req, res) {
		res.send('<b>req.cookies:</b> ' + req.cookies)
	})
  
开发人员工具中 Network 栏效果如下，'Set-Cookie' 的内容即为 res.cookies：  
  
![set_cookie Network 栏效果][3]  

####  删除Cookie

	//delete Cookie
	app.get('/del_cookie', function(req, res) {
		res.cookie('sessionID', null)
		res.send('<b>res.cookies:</b> ' + res.cookies)
	})

访问 '/del_cookie' ，服务器通过把 Cookie 中 key 的 value 设为 null 并且把 Cookie 的过期时间设置过去的一个时间点让 Cookie 立即过期，实现删除 Cookie 的目的。浏览器开发人员工具中 Network 栏效果如下：  
  
![del_cookie Network 栏效果][4]  
  
在访问 '/set_cookie' 之后，删除 Cookie 之前访问 '/' ，由于 Cookie 在 localhost:8054 下共享，浏览器显示的 req.cookies 即在 '/set_cookie' 设置的 Cookie：  
  
![set_cookie 后 req.cookies][5]  
  
访问 '/del_cookie' 之后，req.cookies 也被删除：  
  
![del_cookie 后 req.cookies][6] 





[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cookie/cookie_workflow.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cookie/set_cookie_browser.png
[3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cookie/set_cookie_network.png
[4]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cookie/del_cookie_network.png
[5]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cookie/req_cookies_after_set_cookie.png
[6]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cookie/req_cookies_after_del_cookie.png
