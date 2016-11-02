var onceio = require('../onceio/onceio')
var app = onceio()


app.get('/', function(req, res) {
	res.render('index.html')
})