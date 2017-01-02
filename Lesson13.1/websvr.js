var onceio = require('../onceio/onceio')
global.app = onceio({ home: './web' })

require('./form/svr/form.js')
require('./override/main.js')

//with session support
app.use('/', function(req, res) {
  req.filter.next()
}, { session: true })

app.get('/', function(req, res){
  res.render('main.html')
})
