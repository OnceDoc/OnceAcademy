var onceio = require('onceio')
var app = onceio()


app.get('/', function(req, res) {
  var responseText = '<ul>'
  responseText += '<li><a href="/dot">dot template</a><li>'
  responseText += '<li><a href="/example_pug">pug template</a><li>'
  responseText += '<li><a href="/example_ejs">ejs template</a><li>'
  responseText += '</ul>'
  res.send(responseText)
}) 


// Using default doT.js template engine (option 1)
app.get('/dot', function(req, res) {
  res.render('dot.tmpl', {
    username: 'Kris'
  })
})

// Using default doT.js template engine (option 2)
// app.use('/dot', function(req, res) {
//   res.model.username = 'Kris'
//   req.filter.next()
// })

// app.get('/dot', function(req, res) {
//   res.render('dot.tmpl')
// })


// Using pug template engine
app.engine('pug', require('pug').render)

app.get('/example_pug', function(req, res) {
  res.render('example_pug.pug', {
      username: 'Kris'
    , youAreUsingPug: true
  })
})


// Using EJS template engine
app.engine('ejs', require('ejs').render)

app.get('/example_ejs', function(req, res) {
  res.render('example_ejs.ejs', {
      username: 'Kris'
  })
})