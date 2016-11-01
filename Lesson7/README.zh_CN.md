# OnceAcademy
### Lesson 7 - 提供静态文件     

为了提供静态资源，比如图像、CSS 文件和 JavaScript 文件等，可以将这些资源放在专门的文件夹中，然后用 app.static('folder') 将文件夹设置为 static 模式，使其中的资源可以直接被提供，而不参与中间件、Handler、会话、POST 和 Cookie，以达到节约带宽、减少延迟和降低服务器压力的目的。示例代码如下：

    app.static('css')
    app.static('js')
    app.static('img')
    app.static('icon')
    app.static('fonts')
    app.static('/*/css')
    app.static('/*/js')
    app.static('/*/img')
    app.static('/*/icon')
    app.static('/*/fonts')

#### app.static() 效果演示

以下示例代码对根文件夹使用了 app.static()，因此在默认端口访问 localhost 时，中间件和 Handler 将不被执行：（app.static('/') 在此处仅作为示例使用，实际应用中，为避免本应执行的中间件、Handler 被跳过等问题，app.static() 的参数通常不会是根文件夹，而是专门存放静态资源的文件夹，如 '/css'、'/js'、'/img' 等）

    app.static('/')

    app.use(function(req, res) {
      console.log('MIDDLEWARE')
      req.filter.next()
    })

    app.get('/', function(req, res) {
      res.send('HANDLER')
    }

运行服务器，在默认端口访问 localhost，浏览器显示 “Access forbidden!”，console 窗口效果如下：  
  
![设置 static 时 console 窗口效果][1]
  
如果去掉 app.static('/')，进行相同操作，浏览器显示 “HANDLER”，console 窗口效果如下：  
  
![不设置 static 时 console 窗口效果][2]
  


  




[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/static_console.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/no_static_console.png