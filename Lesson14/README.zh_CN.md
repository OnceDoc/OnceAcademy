# OnceAcademy
### Lesson 14 - 文件上传    

在这一章节中，我们将为大家演示如何使用 OnceIO 实现文件上传功能。

#### 在网页文件中构建表单

以一个只有文件上传功能的简单网页 file.html 为例：

	<!DOCTYPE html>
	<html>
	<body>
	  <form method="post" enctype="multipart/form-data" action="/file/upload">
	    <input type="file" name="file" /><br>
	    <input type="submit" value="Upload" />
	  </form>
	</body>
	</html>

浏览器显示效果是这样的：  
  
![网页显示效果][1]  
  
点击空白长条或“浏览…”按钮可以打开文件浏览窗口选择需要上传的文件：  
  
![文件浏览窗口][2]  
  
#### 建立服务器接收文件逻辑

服务器文件 websvr.js 代码是这样的：

	var fs = require('fs')
	var path = require('path')
	var onceio = require('../onceio/onceio')
	var app = onceio()


	app.get('/', function(req, res){
	    res.render('file.html')
	})

	app.file('/file/upload', function(req, res) {
	  var fileInfo  = req.files.file || {}
	  fs.link(fileInfo.path, path.join('./fileStore', fileInfo.name))
	  res.send('File Uploaded Successfully')
	}).before(function(req, res) {
	  var contentLength = req.headers['content-length'] || 0
	  if (contentLength > 1048576) {
	    res.send({ error: 'Error: File Size Limit (1 MB) Exceeded' })
	  } else {
	    return true
	  }
	})

`var fs = require('fs')` 和 `var path = require('path')` 分别导入了 Node.js 提供的用于操作文件的文件系统（fs）模块和用于处理文件路径的 path 模块。  
  
`app.file(path, callback).before(callback)` 相当于 `app.use(path, callback, {file: true}).before(callback)`，是一个处理上传的文件的中间件。  
  
文件被上传后，它的大小、存放地址、名称、格式和修改时间五项信息会被放在 req.files 的 file 属性里（名称是 type
为 'file' 的 input 标签中 name 的值），它的尺寸信息会被放在 req.headers 的 content-length 属性里。接着， before 中的回调函数会根据 req.headers 中的 content-length 判断上传的文件是否超出了尺寸限制（开发人员可以通过修改 if 语句中的常数改变文件上传尺寸上限，content-length 单位为 byte，1024 * 1024 即代表 1 MB），如果超出了，文件不会被上传，服务器返回错误信息；如果没有超出，函数返回值为 true，服务器继续执行 app.file 中的回调函数，将文件从临时地址转移到指定存储地址，文件上传到这里就完成了。  
  
##### 解决文件重名问题

我们目前的服务器程序是无法解决文件重名问题的。如果用户上传了重名的文件，服务器将会返回文件已经存在的错误。为了解决这个问题，我们可以在文件的主文件名和拓展名之间加入一个时间戳，进行这个处理的函数代码如下：

	var timestampName = function(fileName){

	  // get filename extension
	  var extName = path.extname(fileName) 

	  // get base name of the file
	  var baseName = path.basename(fileName, extName)

	  // insert timestamp between base name and filename extension
	  // the plus sign ('+') before new Date() converts it into a number
	  return  baseName + +new Date() + extName
	}

再把 fs.link 语句里的 fileInfo.name 替换为 timestampName(fileInfo.name)：

	fs.link(fileInfo.path, path.join('./fileStore', timestampName(fileInfo.name)))

改进后的服务器程序就能允许用户上传重名文件了，以上传 5 次名为 'cache_workflow.png' 的文件为例，服务器的文件存储地址中会出现 5 个名称都以 'cache_workflow' 开头但时间戳不同的文件：  
  
![5 个以 'cache_workflow' 开头但时间戳不同的文件][3]  
  
 








[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/uploading_file/webpage_display.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/uploading_file/opening_file.png
[3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/uploading_file/timestamp_name.png
