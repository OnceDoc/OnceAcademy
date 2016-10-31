# OnceAcademy
### Lesson 5 - 三种主要的表单数据传送方法（GET、POST、GET 与 POST 同时使用）    
#### 获取GET中的QueryString数据

在互联网上, QueryString是地址的一部分, 其中包含着需要传给后台的数据，通常以?开始，以&号分割。在表单提交时，会默认以QueryString的形式向后台发送数据，OnceIO会将其存储在req.query对象上。

在项目文件夹中创建服务器文件 websvr.js 和网页文件 form.html。  

websvr.js 的代码如下：  
    
    var onceio = require('../onceio/onceio')

    var app = onceio({
        home   :  "./"
      , port   :  8054
      , listDir:  true
      , debug  :  false
    })

    app.get('/form', function(req, res) {
      res.render('form.html')
    })

    //Handling form-data sent through the GET method
    app.get('/form/get_form.asp', function(req, res) {
      res.write('Received the form-data:\n')
      res.send('req.query: ' + JSON.stringify(req.query))
    })  

form.html 的代码如下：  
    
    <!DOCTYPE html>
    <body>
      <p>Form that sends data through the GET method:</p>
      <form action="/form/get_form.asp" method="get">
        <p>Parameter 1: <input type="text" name="param1" value="GET1" /></p>
        <p>Parameter 2: <input type="text" name="param2" value="GET2" /></p>
        <input type="submit" value="Submit" />
      </form>
    </body>
    </html> 

运行服务器，在浏览器中打开 localhost:8054/form，得到以下结果：  

![GET 浏览器效果][1]    

点击提交后，浏览器显示出服务器收到的包含在 req.query 中的表单数据，地址栏中的 URL 也显示了表单中所有参数的名称和值：  

![GET 提交浏览器效果][2] 

#### 获取POST中的数据

GET将数据放在地址中，而地址中存放的数据量是有限的。POST则将数据存储在Request Body中。OnceIO将Post接收的数据存放在req.body中。

将 websvr.js 文件中的 app.get('/form/get_form.asp', function(req, res)) 函数替换为：  

    //Handling form-data sent through the POST method
    app.post('/form/post_form.asp', function(req, res) {
      res.write('Received the form-data:\n')
      res.send('req.body: ' + JSON.stringify(req.body))
    })  
    

将 form.html 文件中 body 里的内容替换

    <p>Form that sends data through the POST method:</p>
    <form action="/form/post_form.asp" method="post">
      <p>Parameter 1: <input type="text" name="param1" value="POST1" /></p>
      <p>Parameter 2: <input type="text" name="param2" value="POST2" /></p>
      <input type="submit" value="Submit" />
    </form> 

重启服务器，在浏览器中打开 localhost:8054/form，得到以下结果：  

![POST 浏览器效果][3]    

点击提交后，浏览器显示出服务器收到的包含在 req.body 中的表单数据，而地址栏不显示任何表单数据：  

![POST 提交浏览器效果][4]
  
#### 获取Router中的变量及GET/POST同时使用

用户还可以将路由的一部分指定为变量，如 "/form/get_and_post_form.asp/:routeParam"。OnceIO会将routeParam变量的值存放在 req.params中。

app.url接口可以让 GET 与 POST 同时使用。将 websvr.js 文件中的 app.post('/form/post_form.asp', function(req, res)) 函数替换为：  

    //Handling form-data sent through the GET method and the POST method
    app.url('/form/get_and_post_form.asp/:routeParam', function(req, res) {
      res.write('Received the form-data:\n')
      res.write('req.params: ' + JSON.stringify(req.params) + '\n')
      res.write('req.query: ' + JSON.stringify(req.query) + '\n')
      res.send('req.body: ' + JSON.stringify(req.body))
    }, 'qs')  
    
为减少 IO，app.url() 默认不加载 req.body，如需加载，需要把它的第三个参数设置为 'qs' 或 {POST : 'qs'}.  

将 form.html 文件中 body 里的内容替换为：  

    <p>Form that sends data through the GET method and the POST method:</p>
    <form action="/form/get_and_post_form.asp/ROUTE/?getParam=GET" method="post">
      <p>POST Parameter 1: <input type="text" name="postParam1" value="POST1" /></p>
      <p>POST Parameter 2: <input type="text" name="postParam2" value="POST2" /></p>
      <input type="submit" value="Submit" />
    </form> 

这个表单同时使用了三种传送数据的方法：在表单的 action 属性中以 '/' 分隔开 URL 参数将其传送到 req.params 中；在表单的 action 属性中以 '?' 标示 URL 参数将其传送到 req.query 中；用 POST 方式将表单内的输入项传送到 req.body 中。 
  
重启服务器，在浏览器中打开 localhost:8054/form，得到以下结果：  

![GET&POST 浏览器效果][5]    

点击提交后，页面显示出服务器收到的分别包含在 req.params，req.query 和 req.body 中的表单数据，而地址栏中的 URL 只显示了 req.params 和 req.query 中的数据：  

![GET&POST 提交浏览器效果][6]






  [1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson5/get_form.png
  [2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson5/get_form_submit.png
  [3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson5/post_form.png
  [4]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson5/post_form_submit.png
  [5]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson5/get_and_post_form.png
  [6]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson5/get_and_post_form_submit.png
