var onceio    = require('../onceio/onceio')
var OnceStore = require('../onceio/redisstore')
var redis     = require('redis')

var ONCEIO_CONFIG = { sessionTimeout : 1000 * 1000 }
// a Session can remain idle for 1000 seconds before the server terminates it automatically

var app = onceio(ONCEIO_CONFIG)

var client = redis.createClient()

client.on('ready', function() {
  var redisstore    = OnceStore(client, ONCEIO_CONFIG.sessionTimeout / 1000)
  app.sessionStore  = redisstore
})

app.use('/', function(req, res){
    req.filter.next()
}, { session: true })

app.get('/a', function(req, res){
    if(req.session.lastPage) {
        console.log('Last page was: ' + req.session.lastPage + '.')   
    } 

    req.session.lastPage = '/a' //Update session.lastPage everytime the webpage is visited
    res.send('Welcome to a!')
})

app.get('/b', function(req, res){
    if (req.session.lastPage) {
        console.log('Last page was: ' + req.session.lastPage + '.')    
    }

    req.session.lastPage = '/b'  
    res.send('Welcome to b!')
})

app.get('/c', function(req, res){
    if (req.session.lastPage){
        console.log("Last page was: " + req.session.lastPage + '.')    
    }

    req.session.lastPage = '/c'
    res.send('Welcome to c!')
})
