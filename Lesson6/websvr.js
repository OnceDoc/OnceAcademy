var onceio = require('../onceio/onceio')
var app = onceio()


app.get(['/apple', '/banana', '/strawberry'], function(req, res) {
  res.send('fruit')
})

app.get('/OnceAcademy', function(req, res) {
  res.send('OnceAcademy')
}, { mode: 'loose' })

app.get(/ab*cd/, function(req, res) {
  res.send('/ab*cd/')
})  

app.get(/a/, function(req, res) {
  res.send('/a/')
})

app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/')
})

app.get('/:id', function(req, res){
  res.send(req.params.id)
})