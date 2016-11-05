# OnceAcademy
### Lesson 8 - 客户端缓存     
#### 缓存定义  

这里讨论的缓存是指 web 缓存：一个 web 资源（如 html 页面、图片、文件等）在服务器和客户端（浏览器）之间的副本。缓存会根据进来的请求保存请求输出的内容的副本；然后，如果下一个请求是相同的 URL，且网页在这段时间内没有更新，浏览器就不会再次下载网页，而是直接使用本地缓存的网页副本。  
  
缓存的作用主要有：  
  - 节约带宽。
  - 减少延迟。
  - 降低服务器压力。

#### 客户端（浏览器）的缓存机制  

所有的缓存都有一套规则来帮助它们决定什么情况下使用缓存中的副本，什么情况下向源服务器再次发送请求。这些规则有的在协议（如 HTTP 协议 1.0 和 1.1）中有定义，有的则是由缓存的管理员（如 DBA、浏览器的用户、代理服务器管理员或者应用开发者）设置。  
  
对于浏览器端的缓存，这些规则是在 HTTP 协议头和 html 页面的 meta 标签中定义的。它们从**新鲜度**和**校验值**两个维度来决定浏览器是否可以直接使用缓存中的副本。  
  
**新鲜度（过期机制）**：也就是缓存副本有效期。一个缓存副本必须满足以下条件，浏览器才会认为它是有效的：  
  
  1. 含有完整的过期时间控制头信息（HTTP协议报头），并且仍在有效期内；  
  2. 浏览器已经使用过这个缓存副本，并且在一个会话中已经检查过新鲜度；
  
满足以上两个情况的一种，浏览器会直接从缓存中获取副本并渲染。  
  
**校验值（验证机制）**：服务器返回资源的时候有时在控制头信息带上这个资源的实体标签 ETag（Entity Tag），它可以用来作为浏览器再次请求过程的校验标识。如过发现校验标识不匹配，说明资源已经被修改或过期，浏览器需求重新获取资源内容。  
  
##### 常用的与缓存有关的 HTTP 消息报头  

| 消息报头    | 值     | 类型 | 作用 | 规则 |
| ----------- | ------ | ---- | ---- | ---- |
| Status Code |200 OK|普通|表明服务器成功返回网页|不适用|
|             |304 Not Modified|普通|表明当前资源的内容（自上次访问以来或根据请求的条件）没有修改过，服务器不返回网页内容|不适用|
|Cache-Control|max-age=315360000            |响应|指明缓冲副本的有效时长，单位为秒|新鲜度|
| Expires     |Thu, 31 Dec 2037 23:55:55 GMT|响应|告诉浏览器在过期时间前可以使用副本|新鲜度|
|Last-Modified|Sun, 23 Oct 2016 06:36:08 GMT|响应|告诉浏览器当前资源的最近一次修改时间|新鲜度|
|If-Modified-Since|Sun, 23 Oct 2016 06:36:08 GMT|请求|如果浏览器第一次请求时响应中 Last-Modified 非空，第二次请求同一资源时，会把它作为该项的值发给服务器|新鲜度|
|ETag|978534|响应|告诉浏览器当前资源在服务器的唯一标识符（生成规则由服务器决定）|校验值|
|If-None-Match|978534|请求|如果浏览器第一次请求时响应中 ETag 非空，第二次请求同一资源时，会把它作为该项的值发给服务器|校验值|

  
以访问网站 http://oncedoc.com/ 为例，网站的 shader.css 文件的 HTTP 头信息为：  
  
![shader.css 文件的 HTTP 头信息][1]  
  
##### 客户端缓存生效的常见流程

服务器收到请求时，在 200 OK 响应中回送该资源的 Last-Modified 和 ETag，客户端将该资源保存在缓存中，并记录这两个属性。当客户端再次发送相同的请求时，会在请求中携带 If-Modified-Since 和 If-None-Match 两个消息报头。两个报头的值分别是上次请求收到的响应中 Last-Modified 和 ETag 的值。服务器通过这两个头判断本地资源未发生变化，客户端不需要重新下载，返回 304 响应。以访问 oncedoc.com 为例，客户端缓存生效流程如下：  
  
![客户端缓存生效常见流程][2]  

##### 用户操作行为与缓存  

用户在使用浏览器的时的各种操作，如输入地址后回车，按F5刷新等，对缓存有可能会造成影响。  
  
| 用户操作        | Expires/Cache-Controll | Last-Modified/ETag |
| --------------- | ---------------------- | ------------------ |
| 地址栏回车      | 有效                   | 有效               |
| 页面链接跳转    | 有效                   | 有效               |
| 新开窗口        | 有效                   | 有效               |
| 前进后退        | 有效                   | 有效               |
| F5 刷新         | 无效                   | 有效               |
| Ctrl+F5 强制刷新| 无效                   | 无效               |
  
当用户在按 F5 进行刷新时，浏览器会忽略 Expires/Cache-Control 的设置，再次向服务器发送请求，而 Last-Modified/Etag 仍然是有效的，服务器会根据情况判断返回 304 还是 200 ；而当用户使用 Ctrl+F5 进行强制刷新的时候，所有的缓存机制都将失效，；浏览器将重新从服务器下载资源并返回 200。

#### 在服务器端设置客户端缓存机制

##### 浏览器端缓存

运行服务器，访问 localhost:8054/img，打开浏览器开发者工具中的 Network 栏，地址栏回车，Network 显示：  
  
![使用 res.cache(0) 时 Network 栏效果][3]

此时浏览器直接从本地获取图片资源，浏览器和服务器之间并没有进行I/O操作。浏览器没有问服务器端是否有更新，而直接从本地缓存中获取资源。 

##### res.cache(0)

有时侯，我们可能需要禁用浏览器端的缓存机制，然后让浏览器发送一次请求询问是否有更新（比如ajax操作）。可以用添加一个 cache-control的header： res.cache(0)，即0秒后立即失效（不缓存），示例代码如下：

    app.use(function(req, res) {
      res.cache(0)
      req.filter.next()
    })

    app.get('/img', function(req, res) {
      res.render('img.html')
    }) 

此时浏览器与服务器之间会进行一次 I/O，如果本地缓文件的修改时间(IF-Modify-since)与服务器端的一致，即没有修改，则OnceIO会发出 304 响应（如图所示），告诉浏览器从本地缓存中获取资源；如果服务器端文件有更新，OnceIO则会发出 200 响应，并将更新资源重新发给浏览器。
  
![不使用 res.cache(0) 时 Network 栏效果][4]
  
此时服务器端通过304告诉浏览器从本地缓存中获取资源。 
  

  




[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/HTTP_headers_of_shader_css.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/cache_workflow.png
[3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/no_cache0_browser_network.png
[4]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/cache0_browser_network.png
