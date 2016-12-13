var oncedb = require('../oncedb')()

var assert = require("assert")


var client
var schema


describe('连接数据库', function() {

  it('oncedb: 初始化并定义schema', function(done) {
    // client = require('./testRedisClient').getClient()

    //localhost
    client = require('redis').createClient()
    //切换测试用的DB 4
    client.select(4)

    oncedb.init({ client: client }, function(err) {
      if (err) {
        console.error(err)
        return
      }

      assert.equal(err, null)

      /*
      预定义schema
      */
      oncedb.schema('user', {
          username : 'id'
        , email    : 'unique("param")'
        , isAdmin  : 'index'
      })

      done()
    })
  })

  it('oncedb: 添加数据', function(done) {
    oncedb.insert('user', {
        username : 'Tom'
      , email    : 'tom@gmail.com'
      , isAdmin  : 0
    }, function(err1) {

      oncedb.insert('user', {
          username : 'Peter'
        , email    : 'peter@gmail.com'
        , isAdmin  : 0
      }, function(err2) {
        assert.equal(err2, null)
        assert.equal(err1, null)
        done()
      })
    })
  })

  it('oncedb: 查询数据 email', function(done) {
    oncedb.select('user', {
      email    : 'tom@gmail.com'
    }, function(err, docs) {
        assert.equal(docs[0].username, 'Tom')
        console.log(docs[0])
        done()
    })
  })

  it('oncedb: 查询数据 isAdmin', function(done) {
    oncedb.select('user', {
      isAdmin    :  0
    }, function(err, docs) {
        assert.equal(docs.length, 2)
        console.log(docs)
        done()
    })
  })


  it('oncedb: 查询数据 email & isAdmin', function(done) {
    oncedb.select('user', {
        email    : 'tom@gmail.com'
      , isAdmin  : 0
    }, function(err, docs) {
        assert.equal(docs[0].username, 'Tom')
        console.log(docs[0])
        done()
    })
  })

  it('oncedb: 删除数据', function(done) {
    oncedb.client.flushdb(function(err) {

      assert.equal(err, null)

      done()
    })
  })

})