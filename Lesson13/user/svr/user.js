app.mod('user', './user/web')

app.get('/user', function(req, res) {
    res.render('user.html')
})