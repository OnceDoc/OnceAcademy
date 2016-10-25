var onceio = require('../onceio/onceio')

var app = onceio()

app.model({ title: 'test_page', debug: true })

app.use(function(req, res) {
  res.model.debug = false
  res.model.username = 'Kris'
  req.filter.next()
})

app.get('/view', function(req, res) { 
  var userModel = { username: 'Rex' }
  res.render('model.html', userModel)
})

app.get('/view/user/:username', function(req, res) { 
  var userModel = { username: req.params.username }
  res.render('model.html', userModel)
})

