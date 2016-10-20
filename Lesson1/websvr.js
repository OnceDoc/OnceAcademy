//import WebSvr module
var onceio = require('../onceio/onceio')

//Start the WebSvr, running at current folder, default port is 8054, directory browser enabled;
//Trying at: http://localhost:8054
var app = onceio({
    home: './'
  , listDir:  true
  , debug:    true
  , sessionTimeout: 60 * 1000
})

app.get('/', function(req, res) {
  res.end('Hello World!')
}) 
