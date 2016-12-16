# OnceDB
### 数据库对象属性类型  keywords  

在之前说明 id、unique 和 index 的文章中我们创建了有三个属性的 schema user。在这篇文章中，我们将扩展这个 schema，加入新的 keywords 类型的属性：  

	oncedb.extend('user', {keyword : "keywords('key', +new Date())"})

加入新属性后，插入两个具有这一属性的数据库对象，关键词在数据库中以集合形式储存：

    oncedb.insert('user', {username: 'Mary', email:'mary@163.com', keyword:'female,single'})

    oncedb.insert('user', {username: 'Robert', email:'robert@163.com', keyword:'male,single'})
 
可以以 keywords 类型的属性作为查找条件，在 schema 中查找符合条件的对象，以查找 keyword 中有‘single’的 user 对象为例：

    oncedb.select('user', {keyword: 'single'}, function(err, docs) {console.log(docs)})

console 返回的内容为：

    [ { username: 'Mary', email: 'mary@163.com', keyword: 'female,single' }, { username: 'Robert', email: 'robert@163.com', keyword: 'male,single' } ]

查找到‘Mary’和‘Robert’这两个对象。

#### 在数据库中储存形式

keywords 类型属性的所有值会被储存在一个集合中：  
  
![keywords 类型属性的所有值储存在集合中][1]  
  
此外，与 index 属性类似，对每个 keywords 属性的每一个值，数据库系统都会创建一个有序集 ZSET，ZSET 中元素的 value 是所有此 keywords 属性为该值的数据库对象的 id 属性的值：  
  
![针对 keywords 类型属性 keyword = female 创建的 ZSET][2]  
  
  
  



[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceDB/keywords/keywords_set.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceDB/keywords/keywords_zset.png
