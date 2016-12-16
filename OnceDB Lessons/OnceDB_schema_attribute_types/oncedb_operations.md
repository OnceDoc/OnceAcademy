# OnceDB
### OnceDB 的三种操作：remove、update、upsert 

#### remove

使用 remove 语句可以删除数据库对象：

	oncedb.remove('user', {username: Peter}, function(err) {if (err) {console.log(err)}})

oncedb.remove 的第一个参数是 schema 名称，第二个参数是 schema 的 id 属性和要删除的对象的 id 属性的值，第三个参数是可选的回调函数。

#### update

使用 update 语句可以更新数据库对象：

	oncedb.update('user', {username: Tom， email: tom@163.com}, function(err) {if (err) {console.log(err)}})

oncedb.update 的第一个参数是 schema 名称，第二个参数是要更新的属性的名称与新值（必须包含 schema 的 id 属性且不能使用 update 语句更新 id 属性的值），第三个参数是可选的回调函数。
  
#### upsert

使用 upsert 语句在数据库对象不存在时插入对象；在对象存在时更新对象，参数与 update 语句的参数相同。
