var oncedb = require('../oncedb/oncedb')()
var redis  = require('../oncedb/node_modules/redis')

var assert = require("assert")

var client
var schema

describe('connect database', function() {

  it('oncedb: initiate and define schema', function(done) {

    //localhost
    client = redis.createClient()
    //switch to DB 4
    client.select(4)

    oncedb.init({ client: client }, function(err) {
      if (err) {
        console.error(err)
        return
      }

      assert.equal(err, null)

      /*
      define schema
      */
      oncedb.schema('user', {
          username : 'id'
        , email    : 'unique("param")'
        , isAdmin  : 'index'
      })

      done()
    })
  })

  it('oncedb: insert entry', function(done) {
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

  it('oncedb: search entry by email attribute', function(done) {
    oncedb.select('user', {
      email    : 'tom@gmail.com'
    }, function(err, docs) {
        assert.equal(docs.length, 1)
        assert.equal(docs[0].username, 'Tom')
        console.log(docs)
        done()
    })
  })

  it('oncedb: search entry by isAdmin attribute', function(done) {
    oncedb.select('user', {
      isAdmin    :  0
    }, function(err, docs) {
        assert.equal(docs.length, 2)
        console.log(docs)
        done()
    })
  })


  it('oncedb: search entry by email & isAdmin attribute', function(done) {
    oncedb.select('user', {
        email    : 'tom@gmail.com'
      , isAdmin  : 0
    }, function(err, docs) {
        assert.equal(docs.length, 1)
        assert.equal(docs[0].username, 'Tom')
        console.log(docs)
        done()
    })
  })

})

describe('connect database', function() {

  it('oncedb: extend schema', function(done) {

      /*
      extend schema
      */
      oncedb.extend('user', {
          keyword : "keywords('key', +new Date())"
      })

      oncedb.insert('user', {username: 'Mary', email:'mary@163.com', keyword:'female, single'})

      oncedb.insert('user', {username: 'Robert', email:'robert@163.com', keyword:'male, single'})

      setTimeout(done, 2000);
      done()
  })

  it('oncedb: search entry by keyword', function(done) {
    oncedb.select('user', {
      keyword   :  'single'
    }, function(err, docs) {
        assert.equal(docs.length, 2)
        console.log(docs)
        done()
    })
  })

  it('oncedb: remove entry', function(done) {
    oncedb.remove('user', {
      username   :  'Peter'
    }, function(err) {
        console.log(err)
        done()
    })
  })

  it('oncedb: update entry', function(done) {
    oncedb.update('user', {
      username   :  'Tom',
      email       :  'tom@163.com'
    }, function(err) {
        console.log(err)
        done()
    })
  })

  it('oncedb: upsert entry', function(done) {
    oncedb.upsert('user', {
        username : 'Peter'
      , email    : 'peter@gmail.com'
      , isAdmin  : '0'
    }, function(err) {
        console.log(err)
        done()
    })
  })


  it('oncedb: flush database', function(done) {
    oncedb.client.flushdb(function(err) {

      assert.equal(err, null)

      done()
    })
  })
})
