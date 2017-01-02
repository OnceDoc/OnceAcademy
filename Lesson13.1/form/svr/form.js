/*
regist form module
*/
app.mod('form',   './form/web')
app.mod('form2',  './form/web')

//preload *.html
app.pre('form', '.html')

app.model({ title: 'Login form' })

app.get(['/form', '/form2'], function(req, res) {
  res.render('form.html')
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