/*
regist form module
*/
app.mod('form', './form/web')

app.get('/form', function(req, res) {
  res.render('form.html')
})

app.get('/form/test', function(req, res) {
  //absolute path
  res.render('/form.html')
})

app.get('/form/login', function(req, res) {
  var loginUser = req.query

  if (loginUser.password == '123456') {
    req.session.user = loginUser
    res.send('login success')
  } else {
    res.send('bad login')
  }
})