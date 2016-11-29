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

查看 [Node.js 版本列表][7]，选择合适的版本下载。这里使用的是 2016 年 10 月 29 号发布的 6.9.1 版，使用 cd 命令跳转到希望存放下载的 Node.js 文件的目录，然后使用 wget 和 tar -xzf 命令下载并解压 'tar' 包：

	cd Downloads
	wget http://nodejs.org/dist/latest-v6.x/node-v6.9.1.tar.gz
	tar -xzf node-v6.9.1.tar.gz

注：树莓派 3 使用的是 ARM v7 指令集的 CPU，并不是所有最新版的 Node.js 都能在树莓派上使用，因为有些没有正确地指定 ARM 的指令集。

##### 编译 Node.js 

源代码下载并解压完成后，使用以下命令编译 Node.js：

	cd node-v6.9.1
	./configure
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

	v6.9.1
	3.10.8

#### 第三步、配置 Redis

##### 安装 Redis

	# 如不想每条指令都输 sudo，可首先切换到 root 用户
	sudo -s 
	# 创建一个编译的目录
	mkdir /opt/redis
    cd /opt/redis
    # 下载最新版 Redis 压缩包
    # 若版本有更新，可将 “2.8.24” 批量换成最新的版本号
    wget http://download.redis.io/releases/redis-2.8.24.tar.gz
    # 解压缩
	tar -xzf redis-2.8.24.tar.gz
	# 安装
	cd redis-2.8.24
	make install

##### 设置 Redis 的开机自动启动

    # 将编译好的可执行文件放到 /opt/redis 下，系统在开机时会自动寻找这些文件
    cp /opt/redis/redis-2.8.24/src/redis-benchmark /opt/redis/
	cp /opt/redis/redis-2.8.24/src/redis-cli /opt/redis/
	cp /opt/redis/redis-2.8.24/src/redis-server /opt/redis/
	cp /opt/redis/redis-2.8.24/src/redis-check-aof /opt/redis/
	cp /opt/redis/redis-2.8.24/src/redis-check-dump /opt/redis/
	# 创建一个 Redis 用户，目的是提高安全性，防止其他用户访问 Redis 和查看日志，以及限制 Redis 本身的活动范围
	adduser --system --no-create-home --disabled-login --disabled-password --group redis
	# 创建可写的日志文件（log），将此文件的所有者变更为刚刚创建的用户 redis
	touch /var/log/redis.log
	chown redis:redis /var/log/redis.log
	chmod u+w /var/log/redis.log
	# 创建 Redis 配置文件 这里使用 nano 进行编译
	mkdir /etc/redis
	touch /etc/redis/redis.conf
	chown redis:redis -R /etc/redis/
	# 编辑 Redis 配置文件，这里使用的文本编辑器是 nano
	nano /etc/redis/redis.conf

下面是个 Redis 配置文件 redis.conf 的编写范例（如需密码保护请设置 requirepass）：

	daemonize yes
	pidfile /var/run/redis.pid
	logfile /var/log/redis.log
	port 6379
	# bind 127.0.0.1
	# unixsocket /tmp/redis.sock
	timeout 300
	loglevel verbose
	databases 16
	save 900 1
	save 300 10
	save 60 10000
	rdbcompression yes
	dbfilename dump.rdb
	dir /var/redis/
	# requirepass foobared

创建数据库存放目录和 Redis 开机启动脚本：

	mkdir /var/redis
	chown redis:redis /var/redis
	chmod u+xw /var/redis
	cd /etc/init.d/
	# 创建并编辑 Redis 开机启动脚本
	nano redis

开机启动脚本内容：

	#! /bin/sh
	### BEGIN INIT INFO
	# Provides:   redis-server
	# Required-Start: $syslog
	# Required-Stop:  $syslog
	# Should-Start:   $local_fs
	# Should-Stop:    $local_fs
	# Default-Start:  2 3 4 5
	# Default-Stop:   0 1 6
	# Short-Description:  redis-server - Persistent key-value db
	# Description:    redis-server - Persistent key-value db
	### END INIT INFO


	PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
	DAEMON=/opt/redis/redis-server
	DAEMON_ARGS=/etc/redis/redis.conf
	NAME=redis-server
	DESC=redis-server
	PIDFILE=/var/run/redis.pid

	test -x $DAEMON || exit 0
	test -x $DAEMONBOOTSTRAP || exit 0

	set -e

	case "$1" in
	  start)
	  echo -n "Starting $DESC: "
	  touch $PIDFILE
	  chown redis:redis $PIDFILE
	  if start-stop-daemon --start --quiet --umask 007 --pidfile $PIDFILE --chuid redis:redis --exec $DAEMON -- $DAEMON_ARGS
	  then
	    echo "$NAME."
	  else
	    echo "failed"
	  fi
	  ;;
	  stop)
	  echo -n "Stopping $DESC: "
	  if start-stop-daemon --stop --retry 10 --quiet --oknodo --pidfile $PIDFILE --exec $DAEMON
	  then
	    echo "$NAME."
	  else
	    echo "failed"
	  fi
	  rm -f $PIDFILE
	  ;;

	  restart|force-reload)
	  ${0} stop
	  ${0} start
	  ;;
	  *)
	  echo "Usage: /etc/init.d/$NAME {start|stop|restart|force-reload}" >&2
	  exit 1
	  ;;
	esac

	exit 0

为 Redis 添加权限，并设置开机自动启动：

	chmod u+x redis
	update-rc.d -f redis defaults

	# 测试一下
	./redis start

安装完成后，即可运行此命令从本地远程连接 Redis 进行测试， 不输入参数的话将默认以无密码方式访问本机（6379 端口）的 Redis：

	redis-cli -h <主机ip> -p <端口> -a <密码>

#### 第四步、启动 OnceDoc

进入 oncedoc.release 下的 oncedoc 文件夹，执行以下指令启动 OnceDoc：

	sudo node ./svr/oncedoc.js config.js

运行后我们可在同一局域网的任意一台设备上访问 OnceDoc 服务器，服务器默认在 8064 端口下运行，以树莓派在局域网的 IP 地址为 10.10.10.22 为例，服务器访问地址是 10.10.10.22:8064
  
![OnceDoc 网页][8]  
  







[1]: https://www.sdcard.org/downloads/formatter_4/eula_windows/
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/raspberry_pi_web_server/SD_card_formatter_options.png
[3]: https://www.raspberrypi.org/downloads/
[4]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/raspberry_pi_web_server/OS_downloads_page.png
[5]: https://sourceforge.net/projects/win32diskimager/
[6]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/raspberry_pi_web_server/raspberry_pi_OS_interface.png
[7]: http://nodejs.org/dist/
[8]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/raspberry_pi_web_server/OnceDoc_webpage.png