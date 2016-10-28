var onceio = require('../onceio/onceio')
var app = onceio()


var myLogger = function(req, res) {
  console.log('LOGGED')
  req.filter.next()
}
var requestTime = function(req, res) {
  req.requestTime = Date.now()
  req.filter.next()
}

app.use(myLogger)
app.use(requestTime)

app.get('/', function(req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
}) 
