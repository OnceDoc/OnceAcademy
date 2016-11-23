# OnceAcademy
### 用树莓派 3（Raspberry Pi 3）搭建 OnceDoc 服务器   

#### 需要的硬件

1. 树莓派 3（Raspberry Pi 3）1 个
2. Micro SD 卡（存储空间至少为 4G）1 张 
3. SD 卡读卡器 1 个（安装操作系统时会用到）
4. 额定功率为 5V、最小电流为 2A 的电源（可以用 USB 供电口）1 个
5. 有 HDMI 接口的显示器（或者有其它接口的显示器 + HDMI 转换器）1 台
6. USB 键盘 1 个
7. USB 鼠标 1 个

#### 第一步、安装操作系统 

##### 格式化 SD 卡

通过读卡器从计算机读取 SD 卡；  

下载并安装 SD 卡格式化工具 [SD Card Formatter][1]；  

用 SD Card Formatter 格式化 SD 卡，相关设置如下图所示：  
  
![SD Card Formatter 格式化设置][2]  

##### 下载操作系统的镜像文件

访问[树莓派官网下载页面][3]，下载 Raspbian 操作系统；  
  
![树莓派官网下载页面][4]  
  
解压 raspbian.zip 文件。

##### 写入镜像

下载并安装 img 镜像文件写入工具 [Win32 Disk Imager][5]；  

用 Win32 Disk Imager 把 raspbian.img 写入 SD 卡中。

##### 把系统安装到树莓派上

将 SD 卡从计算机上安全退出，插入树莓派；  

启动树莓派，它会自行开始安装 SD 卡中的操作系统，如果连接了显示器，可以看到系统启动后的界面：  
  
![系统启动后界面][6]
  
#### 第二步、安装 Node.js

##### 下载 Node.js 

查看 [Node.js 版本列表][7]，选择合适的版本下载。这里使用的是 2016 年 11 月 22 号发布的 7.2.0 版，使用 cd 命令跳转到希望存放下载的 Node.js 文件的目录，然后使用 wget 和 tar -xzf 命令下载并解压 'tar' 包：

	cd Downloads
	wget http://nodejs.org/dist/latest/node-v7.2.0.tar.gz
	tar -xzf node-v7.2.0.tar.gz

注：树莓派 3 使用的是 ARM v7 指令集的 CPU，并不是所有最新版的 Node.js 都能在树莓派上使用，因为有些没有正确地指定 ARM 的指令集。

##### 编译 Node.js 

源代码下载并解压完成后，使用以下命令编译 Node.js（--prefix 参数为安装目录）：

	cd node-v7.2.0
	./configure --prefix=/usr/local/node-v7.2.0
	make

编译可能会花费好几个小时，所以请耐心等待。

注：以前的版本编译仅需要十几分钟，但随着 Chrome V8 引擎越来越复杂，编译时间也越来越长，应该是因为加入了越来越多对 ECMAScript 6 的支持。如果想要提高编译速度，可以下载 v0.8.x 版进行编译。

##### 安装编译好的 Node.js 代码

一旦编译完成，就可以将 Node.js 安装进树莓派系统。这需要系统管理员权限，可以使用 sudo 命令：

	sudo make install

再重启树莓派：

	sudo reboot

##### 检查安装

一旦安装完成，可以使用以下命令检查版本：

	node -v
	npm -v

显示结果应该是：

	v7.2.0
	3.10.9

#### 第三步、配置 Redis

##### 安装 Redis

最新的 Redis 稳定版 tar 包的下载地址为 http://download.redis.io/redis-stable.tar.gz，使用以下命令跳转到存放下载文件的目录并下载，解压，编译，安装 Redis：

	cd Downloads
	wget http://download.redis.io/redis-stable.tar.gz
	tar -xzf redis-stable.tar.gz
	cd redis-stable
	make
	sudo make install

##### 下载配置文件和 init 启动脚本

	wget https://github.com/ijonas/dotfiles/raw/master/etc/init.d/redis-server
	wget https://github.com/ijonas/dotfiles/raw/master/etc/redis.conf
	sudo mv redis-server /etc/init.d/redis-server
	sudo chmod +x /etc/init.d/redis-server
	sudo mv redis.conf /etc/redis.conf

##### 初始化用户和日志路径

第一次启动Redis前，建议为Redis单独建立一个用户，并新建data和日志文件夹：

	sudo useradd redis
	sudo mkdir -p /var/lib/redis
	sudo mkdir -p /var/log/redis
	sudo chown redis.redis /var/lib/redis
	sudo chown redis.redis /var/log/redis

##### 设置开机自动启动，关机自动关闭

    sudo update-rc.d redis-server defaults

##### 启动 Redis

	sudo /etc/init.d/redis-server start

##### 启动 client 客户端连接

	$ redis-cli
	redis> set foo bar
	OK
	redis> get foo
	"bar"







[1]: https://www.sdcard.org/downloads/formatter_4/eula_windows/
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/raspberry_pi_web_server/SD_card_formatter_options.png
[3]: https://www.raspberrypi.org/downloads/
[4]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/raspberry_pi_web_server/OS_downloads_page.png
[5]: https://sourceforge.net/projects/win32diskimager/
[6]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/raspberry_pi_web_server/raspberry_pi_OS_interface.png
[7]: https://nodejs.org/dist/
