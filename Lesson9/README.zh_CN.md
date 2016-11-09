# OnceAcademy
### Lesson 9 - 服务器端缓存    

Web 资源在服务器和客户端（浏览器）之间的副本不仅能保存在客户端，也可以保存在服务器端。缓存会根据进来的请求将输出内容的副本保存在服务器内存中；然后，如果下一个请求是相同的 URL，且网页在这段时间内没有更新，服务器就不会再次从硬盘中获取内容，而是直接使用内存中缓存的网页副本，达到节约带宽，减少延迟的作用。  
  
下面我们将介绍一些 OnceIO 中和服务器端缓存有关的函数和属性。

#### 服务器端缓存清空函数 app.clear()

app.clear() 能清除通过清空服务器内存删除服务器端缓存，通常会被设置为只有管理员才有权限调用，示例代码如下：  

    app.get('/clear', function(req, res) {
      app.clear()
    }) 

访问 '/clear' 路径，服务器端缓存将被清空。

#### 静态文件服务器端缓存控制 fileCacheSize

fileCacheSize 是服务器端缓存静态文件的最大尺寸，超过这一尺寸的文件将不会被服务器缓存。fileCacheSize 的值可以在定义应用程序时设置，默认值为 0，即不在服务器端缓存任何静态文件，示例代码如下：

    var app = onceio({
      fileCacheSize: 1024 * 1024
    })

fileCacheSize 的单位是 Byte，1024 * 1024 代表 1 MB。fileCacheSize 的值建议设为 1~2 MB。如果它的值太大，OnceIO 的内存将被大量占用且压缩过程将会耗费很多时间。  
  
当一个路径第一次被访问时，OnceIO 会自动将响应中体积小于 fileCacheSize 的文件存入内存并用 gzip 将这些文件逐个压缩打包再存一份。当路径再次被访问时，服务器便可直接发送 OnceIO 内存中的文件而无需再次从硬盘中获取，此时是否发送压缩包版本则是根据用户端浏览器是否支持 gzip 决定的。
  
一般情况下，对于每个 URL，服务器只需要对硬盘进行一次 I/O，这也是 OnceIO 名称的由来。  

fileCacheSize 为 0，即禁用服务器端缓存机制时，一个没有客户端缓存的客户端访问某个被其它用户访问过的路径时浏览器开发者工具中的 Network 栏效果如下：  
  
![不使用服务器内存缓存机制时 Network 栏效果][1]
  
其它条件不变，使用服务器内存缓存机制时浏览器 Network 栏效果如下，服务器用内存中的 gzip 压缩包发来响应：  
  
![使用服务器内存缓存机制时 Network 栏效果][2]  
  
与浏览器端缓存不同的是，服务器端缓存没有判断缓存文件有效性的功能，因此每次修改后端文件后，开发人员都需重启服务器或使用 app.clear() 清空服务器内存以确保服务器内存中的缓存总是最新的。一般情况下每次发布和布暑新版本的node应用后，重启nodejs进程都是必须的，借助redis等sesion持久化存储，这个重启过程可以在几秒之内完成，并且不影响当前登录用户的session会话状态。

#### 服务器端模板文件缓存

##### templateCache

templateCache 的默认值为 false，即不在服务器端缓存 tmpl 文件、part 文件等动态文件。它的值可以在定义应用程序时设置，示例代码如下：  

    var app = onceio({
       templateCache: true
    })

当 templateCache 为 true 时，模板文件会在服务器内存中被缓存。此时除非重启服务器，否则模板文件将不会被刷新。

##### preload

模板的嵌套情况有时会比较复杂，此时加载完成所有模板需要一定的时间，所以用户第一次访问时浏览器可能无法显示网页的渲染内容，用户需要刷新才能看到完成了模板渲染的完整网页。为了解决这个问题，OnceIO 内置了 preload 方法。对当前目录下的 tmpl 后缀的文件使用 preload 的示例代码如下： 

	app.preload('.', '.tmpl')

preload 的第一个参数是相对路径，示例中的 '.' 代表 home 路径，home 是 OnceIO 应用程序的一个属性，它的值可以在定义应用程序时设置，默认值为 './'，即当前目录；preload 的第二个参数是文件类型，示例中的 '.tmpl' 代表 tmpl 后缀的动态网页文件。 
  
使用 preload 后，即使服务器没有受到客户端的请求，也会提前加载模板文件，将其缓存在服务器内存中，用户第一次访问时无需刷新即可看到渲染完成的网页。  
  

  




[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/no_fileCacheSize_browser_network.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/fileCacheSize_set_browser_network.png
