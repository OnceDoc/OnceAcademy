OnceDoc是一个高性能的、高度独立的企业内容（网盘）管理系统。基于OnceIO Web框架，可对Web进行分布式模块化存储和动态路由。前端、后端和数据库定义都集中存储在一个扩展包里，每一个扩展包都是一个功能独立的应用，只需通过添加/删除文件夹的方式就可实现功能删减，解压即用。任何人5秒钟即可实现模块的安装。通过模块扩展包，您可以将OnceDoc变成邮箱、流程管理、分享社区、资产管理、商城等系统，如果您需要定制功能扩展，请联系我们。

#### 第一步、下载模块功能拓展包
登陆OnceDoc账号，点击"我的订单"，选择订单编号，下载OnceDoc功能扩展包，比如邮箱模块"mail"
![模块功能拓展包][1]

#### 第二步、安装模块功能扩展包
下载完Mail模块后，找到 "/oncedoc/mod" 目录，解压则安装完成。注意"/oncedoc"根目录下原有一个mail文件夹，与需要添加的文件夹不同。
![解压拓展包][2]

####第三步、重启OnceDoc实例

重启oncedoc实例即会自动加载刚刚安装的mail模块了。快速重启，可以两次ctrl+c。此时会自动解析 ".eml" 邮件文件，如果您要接收或发送邮件，您还需要额外在域名上设置mx和spf记录。

[1]:https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/OnceDoc/module-download.png
[2]:https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/OnceDoc/module-install.png