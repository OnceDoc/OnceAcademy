var onceio = require('../onceio/onceio')
var app = onceio({
	fileCacheSize: 1024 * 1024
	/* enable cache of template/include file 
	(when enabled templates will not be refreshed before restart) */
  , templateCache: true
})


app.preload('.', '.tmpl')

app.get('/clear', function(req, res) {
    app.clear()
}) 