# OnceAcademy
### Lesson 13 - 模块    

一个网站通常会包含很多用于实现不同功能的页面，例如在 OnceDoc 网站的众多页面中，有实现博客功能的，有实现文件管理功能的，有实现产品介绍功能的……OnceIO 支持把实现某一特定功能的文件，包括 JavaScript 文件、CSS 文件、HTML 文件等，存放在一起组成一个功能模块，达到使文件存放更加有序，各功能模块独立性更强、模块重用、更新、Debug 更方便的目的。  

以创建一个简单的填写、提交表单的功能模块为例，我们新建了一个 form 文件夹，并在其中新建了一个存放后端文件的 svr 文件夹和一个存放前端文件的 web 文件夹，web 文件夹中的文件有时还可进一步细分为 JavaScript 文件、CSS 文件、图片文件、网页文件等。加上主 web 目录和主服务器文件，项目文件夹的结构如下图所示：  
  
![项目文件夹结构][1]
  
#### 注册模块

我们之前介绍过如何搭建最简单的 web 服务器，服务器文件代码是这样的：  

	var onceio = require('../onceio/onceio')
	var app = onceio({home: './web'})


	app.get('/', function(req, res){
	    res.end('Hello, world')
	})

现在我们要把这个文件作为所有模块共用的基础程序，因此我们要把代码中的 app 变量设置为全局变量，再在代码中增加调用各个模块程序的语句，修改后的代码如下:

	var onceio = require('../onceio/onceio')
	global.app = onceio({home: './web'})


	require('./form/svr/form.js')

	app.get('/', function(req, res){
	    res.render('main.html')
	})





[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/project_folder_structure.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/module/example_console_display.png
