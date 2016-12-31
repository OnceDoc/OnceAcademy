# OnceAcademy
### 模块路由复写与国际化

软件系统时常需要针对不同的客户定制不同的界面和功能。OnceIO的模块路由机制可以在不改变系统原代码的情况下，通过一个扩展包，对系统原有模板进行重定向或复写。从而能以非侵入式的方式和较小代价实现对系统的深度定制和扩展。

#### 模块文件的路由重定向与复写

我们将前一篇文章中的示例登录模块 form。稍加修改添加了 head.html和foot.html 的引用。

    <!DOCTYPE html>
    <html>
    <head>
      <link rel='stylesheet' href='/form/css/form.css'>
    </head>
    <body>
      <!--#include="head.html"-->
      <form action='/form/login' method='get'>
        <p>Username: <input type='text' name='username' value='admin' /></p>
        <p>Password: <input type='text' name='password' value='123456' /></p>
        <input type='submit' value='Login' />
      </form>
      <!--#include="foot.html"-->
      <script src="/form/js/form.js"></script>
    </body>
    </html>

以具有一个简单的用户登录项目为例。
项目中会有一个实现用户登录功能的 form 模块和实现用户登录后的欢迎界面的 user 模块。


以具有一个简单的用户登录项目为例。
项目中会有一个实现用户登录功能的 form 模块和实现用户登录后的欢迎界面的 user 模块。

两个模块文件夹中又分别有存放后端文件的 svr 文件夹和存放前端文件的 web 文件夹，web 文件夹中的文件有时还可进一步细分为 JavaScript 文件、CSS 文件、图片文件、网页文件等。再加上项目的主 web 目录和主程序，项目文件夹的结构如下图所示：
  
![项目文件夹结构][1]


#### 国际化翻译复写

