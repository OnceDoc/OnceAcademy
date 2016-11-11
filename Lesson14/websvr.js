var fs = require('fs')
var path = require('path')
var onceio = require('../onceio/onceio')
var app = onceio()


app.get('/', function(req, res){
    res.render('file.html')
})

app.file('/file/upload', function(req, res) {
  var fileInfo  = req.files.file || {}
  fs.link(fileInfo.path, path.join('./fileStore', timestampName(fileInfo.name)))
  res.send('File Uploaded Successfully')
}).before(function(req, res) {
  var contentLength = req.headers['content-length'] || 0
  if (contentLength > 1048576) {
    res.send({ error: 'Error: File Size Limit (1 MB) Exceeded' })
  } else {
    return true
  }
})

var timestampName = function(fileName){
  var extName = path.extname(fileName)
  return  path.basename(fileName, extName) + +new Date() + extName
}

