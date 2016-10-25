# OnceAcademy
### Lesson 6 - 路由    
##### 路由定义  

路由用于确定应用程序如何响应对特定端点的客户机请求，包含一个 URI（或路径）和一个特定的 HTTP 请求方法（GET、POST 等）。  
  
每个路由可以具有一个或多个处理程序函数，这些函数在路由匹配时执行。  
  
路由定义采用以下结构：  
  
    app.METHOD(PATH, HANDLER)

其中：  
- app 是 OnceIO 的实例。  
- METHOD 是 HTTP 请求方法。  
- PATH 是服务器上的路径。  
- HANDLER 是在路由匹配时执行的函数。

##### 路由路径  

路径中可以加入变量，例如：
    
    app.get('/:id', function(req, res){
      res.send(req.params.id)
    })

路径可以用正则表达式表示，例如：
  
此路由路径将匹配 abcd、abbcd、abbbcd 等。  

    app.get(/ab*cd/, function(req, res) {
      res.send('/ab*cd/');
    });  

此路由路径将匹配名称中具有“a”的所有路由。  

    app.get(/a/, function(req, res) {
      res.send('/a/');
    });

此路由路径将匹配 butterfly 和 dragonfly，但是不匹配 butterflyman、dragonfly man 等。  

    app.get(/.*fly$/, function(req, res) {
      res.send('/.*fly$/');
    });

可以用数组表示多个路径，例如：  
  
此路由路径将匹配 apple, banana 和 strawberry

    app.get(['/apple', '/banana', '/strawberry'], function(req, res) {
      res.send('fruit');
    });





##### 路由方法
下表中响应对象 (res) 的方法可以向客户机发送响应，并终止请求/响应循环。如果没有从路由处理程序调用其中任何方法，客户机请求将保持挂起状态。  
  
| 方法                       | 描述                                                |
| -------------------------- | --------------------------------------------------- |
| res.end()                  | 结束响应进程。                                      |
| res.redirect()             | 重定向请求。                                        |
| res.send(statusCode)       | 设置响应状态码并以响应主体形式发送其字符串表示。    |
| res.send(statusCode, text) | 设置响应状态码并以响应主体形式发送其字符串表示。    |
| res.send(json)             | 发送 JSON 响应。                                    |
| res.send.redirect()        | 重定向请求。                                        |
| res.send.sendFile()        | 以八位元流形式发送文件。                            |





