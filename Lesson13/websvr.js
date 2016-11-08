var onceio = require('../onceio/onceio')
global.app = onceio({home: './web'})


require('./form/svr/form.js')

app.get('/', function(req, res){
    res.render('main.html')
})


