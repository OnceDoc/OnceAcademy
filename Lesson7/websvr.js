var onceio = require('onceio')
var app = onceio()


// app.static('/')

app.use(function(req, res) {
  console.log('MIDDLEWARE')
  req.filter.next()
})

app.get('/', function(req, res) {
  res.send('HANDLER')
}) 