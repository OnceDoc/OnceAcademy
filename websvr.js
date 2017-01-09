    var onceio = require('onceio')

    var app = onceio({
        home   :  "./"
      , port   :  8054
      , listDir:  true
      , debug  :  false
    })

    app.get('/dot', function(req, res) {
      res.render('dot.tmpl', {
        username: 'Kris'
      })
    })  