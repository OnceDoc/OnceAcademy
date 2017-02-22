var onceio = require('onceio')
var app = onceio({
	fileCacheSize: 1024 * 1024
	/* enable cache of template/include file 
	(when enabled templates will not be refreshed before restart) */
 // , listDir: true
  , templateCache: true
})


app.preload('.', '.tmpl')
app.preload('.', '.html')

app.get('/clear', function(req, res) {
    app.clear()
    res.end()
 }) 

app.get('/', function(req, res) {
    res.render('indexhome.html')
 }) 
 