var onceio = require('../onceio/onceio')
global.app = onceio({ home: './web' })


require('./form/svr/form.js')
require('./user/svr/user.js')

app.get('/', function(req, res){
    res.render('main.html')
})


