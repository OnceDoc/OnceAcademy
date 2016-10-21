var onceio = require('../onceio/onceio')

var app = onceio()

app.model({ title: 'test_page', debug: true })

app.use(function(req, res) {
  res.model.debug = false
  res.model.username = 'Kris'
  req.filter.next()
})

app.get('/', function(req, res) {
  res.render('model.html', { 
    username: 'Rex' 
  })
})


