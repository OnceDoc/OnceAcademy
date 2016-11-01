var onceio = require('../onceio/onceio')
var app = onceio()


app.use(function(req, res) {
  res.cache(0)
  req.filter.next()
})

app.get('/img', function(req, res) {
  res.render('img.html')
}) 