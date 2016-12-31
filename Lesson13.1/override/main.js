


app.use('/', function(req, res) {
  app.model({ local: {
      TITLE : 'Override title'
    , FORM  : 'Override form'
  }})

  req.filter.next()
})



