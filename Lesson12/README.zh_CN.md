# OnceAcademy
### Lesson 12 - Session（会话）    

#### Session 简介

HTTP 是一种无状态的协议，服务器单从网络连接上无从知道客户身份，这给交互式 Web 应用程序的实现带来了阻碍。Session 和 Cookie 一样，也是用来绕开 HTTP 的无状态性的手段之一，但与 Cookie 在客户端保存状态信息不同，Session 将用户的状态信息保存在服务器端。  
  
当应用程序需要为某个客户端的请求创建一个 session 的时候，服务器会首先检查这个客户端的请求里是否已包含了一个 session 标识，即 session id。如果已包含一个 session id，则说明服务器为此客户端创建过 session，服务器就会把这个 session id 对应的 session 检索出来使用（如果检索不到，可能会新建一个）；如果客户端请求不包含 session id，服务器就会为此客户端创建一个新的 session 并且生成一个与此 session 相关联的 session id。Session id 的值应该是一个既不会重复，又不容易被找到规律以仿造的字符串。这个 session id 将在本次响应中被返回给客户端保存（常放在 Cookie 中返回，客户端 Cookie 禁用时也可放在 URL 中）。
  
以一个记录用户名字的 session 为例，session 生效的流程如下：  
  
![示例 session 生效流程][1]  
  
####  Session 的相关设置

OnceIO 使用 res.cookies 和 req.cookies 对象储存 Cookie；用 res.cookie 函数设置或删除 Cookie，示例代码如下：






[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/session/session_workflow.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/session/set_session_browser.png
[3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/session/set_session_network.png
[4]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/session/del_session_network.png
[5]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/session/req_sessions_after_set_session.png
[6]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/session/req_sessions_after_del_session.png