# 我们做了一个支持全文搜索和关系查询的Redis

我们的企业网盘[OnceDoc](http://cn.oncedoc.com)和管理软件采用内存数据库Redis。Redis 是一个使用 C 语言编写的键值对存储数据库，体积小巧，性能优异，实施简单。很多大并发网站如Twitter、GitHub  Weibo、Snapchat、Flickr、阿里等都将其用作SESSION存储及缓存的管理。出于性能的考虑 Redis 自带的命令一般不支持按值查找。但是企业软件又需要数据库有搜索、复杂条件查询以及聚合分析的能力。为了实现这些功能我们修改了Redis的源码。并创建了一个新的开源分支 [OnceDB](https://github.com/OnceDoc/OnceDB)，用户可以到Github下载最新的[Windows版本](https://github.com/OnceDoc/OnceDB.win/releases)进行测试。

注* 我们为部分客户部署了一些Linux实例，到目前为止运行稳定，Windows版本并没有在生产环境测试过。

## 版本
  
我们基于Redis3.x版本进行修改，尽管最新的4.x添加了外部模块的支持，但并不适合我们的应用场景，外部模块会增加Reids的使用风险，并且会增加修改的难度。Redis从3.x版本开始支持集群Cluster，足以满足我们的需要。

## 驱动

我们基于node_redis@v0.12.1版本做了一个新的node.js驱动 [oncedb-client](https://github.com/OnceDoc/node-oncedb-client)。

### 安装

使用npm安装 oncedb-client 驱动模块

    npm install oncedb-client

通过require安装oncedb-client模块，并创建client，此时会默认连接本地6379端口的redis，然后就可以用他在nodejs中进行查询了。

    var client = require("oncedb-client").createClient();

### 查询 String: search [key pattern] operator value

string是redis最基本的类型，而且string类型是二进制安全的。即string可以包含任何数据。比如jpg图片或者序列化的JSON对象。下例在 text* 类型的key中查找值为'Kris'的数据

    var client = require("oncedb-client").createClient();

    client.search('text*', '=', 'Kris', function(err, objs) {
      console.log(objs)
    })

输出结果为数组，第一条为健第二条记录为值

    > [ 'text1', 'Kris' ]


搜索含有Kris的记录

    client.search('text*', '~', 'Kris', function(err, objs) {
      console.log(objs)
    })

输出结果为两组健值

    > [ 'text1', 'Kris', 'text5', 'This is ok, Kris' ]


### 查询 Hash: hsearch [key pattern] field operator value ...

Redis hash是一个string类型的field和value的映射表。一个hash类型的key含多个field，一个field对应一个value。Hash非常适合存放JSON对象。hsearch支持对field进行查询。

比如查询一条userInfo记录，其中 nVisit > 100 ，也可写作： 'nVisit' : { '$gt' : '100' }

    client.hsearch('userInfo:*', {
        'name'     : 'Mar'
      , 'gender'   : 'male'
      , 'nVisit'   : { '>' : '100' }
    }, function(err, objs) {
        console.log(objs)  
    })

查找结果

    > [ { _key: 'userInfo:1006',
       name: 'Mar',
       gender: 'male',
       nVisit: '10000' } ]


【文档不断完善中】


原文地址：http://cn.oncedoc.com/sign/in