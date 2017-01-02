
app.mod('override', './override')
app.pre('override', '.html')

app.use('/form2', function(req, res) {
  res.model({
    title : 'Title override'
  })

  res.template({
      'head.html': 'override/head.html'
    , 'foot.html': ''
  })

  req.filter.next()
})
