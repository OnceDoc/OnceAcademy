# OnceAcademy
### Lesson 10 - 网页文件嵌套    

OnceIO 提供将一个网页文件嵌套在另一个网页文件中的语法：<!--#include="path"-->，其中 path 为文件相对路径，引号必须为双引号。以 index.html 的代码为例：

	<!DOCTYPE html>
	<html>
	<body>
	  <!--#include="header.html"--> 
	  <div> 
	    Main content 
	  </div>
	  <!--#include="footer.html"--> 
	</body>
	</html>

这段代码将 header.html 和 footer.html 两个网页文件嵌套在 index.html 中。用户访问 index.html 时，header.html 和 footer.html 也会被同时加载，其中的元素将显示在网页的相应位置。  
  
header.html 代码为：

	<div>
	  <center>
	    Header
	  </center>
	  <hr>
	</div>

footer.html 代码为：

	<div class='footer'>
	  <hr>
	  <center>
	    Footer
	  </center>
	</div>
  
index.html 显示效果为：  
  
![index.html 显示效果][1] 
  
嵌套的层数理论上是没有限制的，被嵌套网页也能嵌套其它网页，但互相嵌套可能会造成问题。例如，如果在 header.html 中嵌套 index.html，index.html 显示效果为：  
  
![互相嵌套时 index.html 显示效果][2] 
  
使用网页嵌套时，服务器需要时间加载所有被嵌套网页，因此用户第一次访问时浏览器可能无法显示被嵌套网页的内容，刷新后才能显示完整网页，使用服务器端缓存一章中介绍的 preload 方法能解决这个问题。
  




[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/webpage_nesting/index_webpage.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/webpage_nesting/mutual_nesting.png