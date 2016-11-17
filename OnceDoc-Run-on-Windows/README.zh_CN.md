# OnceAcademy

### 在 Windows 系统下运行 OnceDoc    

#### 第一步、安装 Node.js

在 [Node.js 官网](nodejs.org) 下载并安装Node.js [(详细过程)][3]。

#### 第二步、运行 OnceDoc

拿到最新的OnceDoc发行版并解压后，找到 'oncedoc.release' 目录下的 start.cmd，并双击运行，启动 OnceDoc 的本地服务器，即安装完毕：
  
![运行 oncedoc.cmd][1]

此时会启动两个进程，一个是OnceDB所基于的内存数据库Redis，一个是OnceDoc主进程。

#### 第三步、访问 OnceDoc

这时我们就可以在浏览器中访问 localhost:8064，使用 OnceDoc 的各项功能了：  
  
![访问 localhost:8064][2]

[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/OnceDoc/start.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Win_run_OnceDoc/visiting_localhost.png
[3]: https://github.com/OnceDoc/OnceAcademy/blob/master/OnceDoc-Install-NodeJS-on-Windows/README.zh_CN.md