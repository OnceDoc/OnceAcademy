var onceio = require('../onceio/onceio')
var app = onceio()


//set Cookie
app.get('/set_cookie', function(req, res) {
	res.cookie('sessionID', 1234, { domain: '', path: '/', httponly: true })
	//equals to "res.cookie('sessionID', 1234)"
	res.send('<b>res.cookies:</b> ' + res.cookies)
})

//delete Cookie
app.get('/del_cookie', function(req, res) {
	res.cookie('sessionID', null)
	res.send('<b>res.cookies:</b> ' + res.cookies)
})

//display request cookie
app.get('/', function(req, res) {
	res.send(req.cookies)
})