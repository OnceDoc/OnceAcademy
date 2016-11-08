app.mod('form', './form/web')

app.get('/form', function(req, res) {
    res.render('form.html')
})