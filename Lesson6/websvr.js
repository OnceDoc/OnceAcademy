var onceio = require('../onceio/onceio')

var app = onceio({
    home   :  './'
  , port   :  8054
  , listDir:  true
  , debug  :  false
})

app.get('/:id', function(req, res){
  res.send(req.params.id)
})

app.get(/ab*cd/, function(req, res) {
  res.send('/ab*cd/');
});  

app.get(/a/, function(req, res) {
  res.send('/a/');
});

app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});

app.get(['/apple', '/banana', '/strawberry'], function(req, res) {
  res.send('fruit');
});