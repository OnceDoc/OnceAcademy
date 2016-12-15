# OnceDB
### 数据库对象属性的三种类型：id、unique、index    

使用 OnceDB 创建 schema（数据库对象的集合）时，需要为 schema 中的各个属性选择类型，以创建 user schema 为例：  

	oncedb.schema('user', {
	    username : 'id'
	  , email    : 'unique("param")'
	  , isAdmin  : 'index'
	})

其中 username 的类型为 id，email 类型为 unique("param")，isAdmin 类型为 index。  

创建好 schema 后，可以向其中插入数据库对象，以插入 username 分别为‘Tom’和‘Peter’的两个 user 对象为例：

    oncedb.insert('user', {username: 'Tom', email: 'tom@gmail.com', isAdmin: 0}, function(err){console.log(err)})

    oncedb.insert('user', {username: 'Peter', email: 'peter@gmail.com', isAdmin: 0}, function(err){console.log(err)})

插入数据库对象后，可以用查询语句在 schema 中查找符合条件的对象，带参数的 unique 类型和 index 类型的属性都可以作为查找条件。以查找 email 为‘tom@gmail.com’的 user 对象为例：

    oncedb.select('user', {email: 'tom@gmail.com'}, function(err, docs) {console.log(docs)})

console 返回的内容为：

    [ { username: 'Tom', email: 'tom@gmail.com', isAdmin: '0' } ]

查找到‘Tom’这一对象。

#### id

id，即唯一标识符，每一个 schema 必须有且只能有一个 id 类型的属性。属于同一个 schema 的数据库对象的 id 属性的值不能重复。以上面的 user schema 为例，如果已经有 user 对象使用了“Tom”作为 username，那么当另一个 user 对象将 username 设置为“Tom”时，数据库系统将报错并中止这一操作。

#### unique 

与 id 属性相似，同属一个 schema 的数据库对象的 unique 属性的值不能重复。unique 类型分为无参数的和有一个参数的两种，只有有参数的 unique 类型属性才能作为数据库对象的查询条件。  
  
unique 的参数 param 在数据库中储存形式是以 unique 属性的值为 key，schema 的 id 属性的值为 value 的 hash 表：  
  
![unique 的参数 param 在数据库中储存形式][1]  
  
#### index

index 属性也可以作为数据库对象的查询条件。对每个 index 属性的每一个值，数据库系统都会创建一个有序集 ZSET，ZSET 中元素的 value 是所有符合此 index 属性为该值的条件的数据库对象的 id 属性的值。  
  
以有 { username: 'Tom', email: 'tom@gmail.com', isAdmin: '0' } 和 { username: 'Peter', email: 'peter@gmail.com', isAdmin: '0' } 两个对象的 user schema 为例，针对 isAdmin 这一 index 属性的值 '0'，数据库系统创建了一个 ZSET：  
  
![针对 isAdmin = 0 创建的 ZSET][2]  
  
  
  



[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceDB/id_unique_index/unique_param_hash.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceDB/id_unique_index/index_store.png
