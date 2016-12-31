app.mod('user', './user/web')

app.get('/user', function(req, res) {
  var userInfo = req.session.user

  res.render('user.html', userInfo)
})