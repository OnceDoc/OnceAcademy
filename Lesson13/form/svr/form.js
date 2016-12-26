app.mod('form', './form/web')

app.get('/form', function(req, res) {
  res.render('form/form.html')
})

app.get('/form/login', function(req, res) {
  var loginUser = req.query

  if (loginUser.password == '123456') {
    req.session.user = loginUser
    res.redirect('/user')
  } else {
    res.send('bad login')
  }
})