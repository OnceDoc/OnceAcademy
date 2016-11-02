var onceio = require('../onceio/onceio')
var app = onceio()


app.preload('.', '.html')

app.get('/', function(req, res) {
	res.render('index.html')
})