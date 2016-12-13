var oncedb=require("../oncedb")(),assert=require("assert"),testCase=function(e,t){var n,r;describe("连接数据库",function(){it("oncedb: 初始化并定义schema",function(t){n=require("redis").createClient(),n.select(4),oncedb.init({client:n},function(n){if(n){console.error(n);return}assert.equal(n,null),oncedb.schema("userInfo",e),t()})}),it("测试 redis command",function(e){e()})}),describe("SELECT 条件查询",function(){it("Select: 插入关联数据集",function(e){oncedb.insert("userInfo",{name:"Kris",gender:"male",active:1,joinTime:+(new Date)},function(t){oncedb.upsert("userInfo",{name:"Elon",gender:"male",active:1,joinTime:+(new Date)},function(t){oncedb.insert("userInfo",{name:"Telyer",gender:"male",active:0,joinTime:+(new Date)},function(t){oncedb.insert("userInfo",{name:"Mars1",gender:"female",active:0,joinTime:+(new Date)},function(t){oncedb.insert("userInfo",{name:"Mars2",gender:"female",active:0,joinTime:+(new Date)},function(t){assert.equal(t,null),e()})})})})})}),it("Select: 条件查询测试",function(e){oncedb.select("userInfo",{gender:"male"},function(t,n){assert.ok(n.length>1),e()})});var e;it("Select: 多条件组合查询",function(t){oncedb.select("userInfo",{gender:"male",active:0},function(n,r){assert.equal(r.length,1),e=r[0],console.log(e),assert.equal(e.name,"Telyer"),t()})}),it("Update 更新索引验证",function(t){oncedb.update("userInfo",{id:e.id,name:"Goodbye",active:1},function(e,n){assert.equal(e,null),oncedb.select("userInfo",{gender:"male",active:0},function(e,n){assert.equal(n.length,0),t()})})}),it("Upsert 更新索引验证",function(t){oncedb.upsert("userInfo",{id:e.id,active:0},function(n,r){assert.equal(n,null),oncedb.select("userInfo",{gender:"male",active:1},function(n,r){for(var i=0;i<r.length;i++)assert.ok(e.id!=r[i].id);t()})})}),it("Select: 删除关联数据",function(e){oncedb.select("userInfo",function(n,r){r.forEach(function(e){oncedb.remove("userInfo",{id:e.id})}),assert.equal(n,null),oncedb.client.del("_.SEQUENCE",function(){assert.equal(n,null),e(),t&&t()})})})})};testCase({id:"id;sequence(this.gender, 1000)",name:"minlen(1);maxlen(256);",gender:"minlen(1);maxlen(256);index",active:"minlen(1);maxlen(256);index",joinTime:"int"},function(){testCase({id:"id;sequence(this.gender, 1000)",name:"minlen(1);maxlen(256);",gender:"minlen(1);maxlen(256);index('usr_type', +new Date())",active:"minlen(1);maxlen(256);index('usr_active', +new Date())",joinTime:"int"})})/* Powered and Minified by OnceDoc */