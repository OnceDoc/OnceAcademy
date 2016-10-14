var onceio = require('../onceio/onceio')

var app = onceio({
    home   :  "./"
  , port   :  8054
  , listDir:  true
  , debug  :  false
})

app.get('/dot', function(req, res) {
  res.render('dot.tmpl', {
    username: 'Kris'
  })
})


// Comparison between Express and OnceIO when using pug
// require('pug').__express(path, option)
// require('pug').render(content, option)

// Using pug template engine
// var fn = pug.compile('string of pug', options);
// var html = fn(locals);

// app.engine('pug', require('pug').render);

// app.get('/pug', function(req, res) {
//   res.render('pug.pug', {
//       username: 'Kris'
//     , youAreUsingPug: true
//   })
// })


// Comparison between Express and OnceIO when using EJS
// require('ejs').__express(path, option)
// require('ejs').render(content, option)

// Using EJS template engine
// app.engine('ejs', require('ejs').render)

// app.get('ejs', function(req, res) {
//   res.render('ejs.ejs', {
//       username: 'Kris'
//   })
// })