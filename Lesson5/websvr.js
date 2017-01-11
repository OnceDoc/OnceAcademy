var onceio = require('onceio')
var app = onceio()


app.get('/form', function(req, res) {
  res.render('form.html')
})

//Handling form-data sent through the GET method
app.get('/form/get_form.asp', function(req, res) {
  res.write('Received the form-data:\n')
  res.send('req.query: ' + JSON.stringify(req.query))
})

//Handling form-data sent through the POST method
app.post('/form/post_form.asp', function(req, res) {
  res.write('Received the form-data:\n')
  res.send('req.body: ' + JSON.stringify(req.body))
})

//Handling form-data sent through the GET method and the POST method
app.url('/form/get_and_post_form.asp/:routeParam', function(req, res) {
  res.write('Received the form-data:\n')
  res.write('req.params: ' + JSON.stringify(req.params) + '\n')
  res.write('req.query: ' + JSON.stringify(req.query) + '\n')
  res.send('req.body: ' + JSON.stringify(req.body))
}, 'qs')
