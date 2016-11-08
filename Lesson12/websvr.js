var onceio = require('../onceio/onceio')
var app = onceio({ 
    sessionTimeout : 10000 
  , sessionDir     : './sessionStore'
})


app.use('/', function(req, res){
    req.filter.next()
}, { session: true })


app.get('/a', function(req, res){
    if(req.session.lastPage) {
        console.log('Last page was: ' + req.session.lastPage + '.')    
    } 

    req.session.lastPage = '/a' //Update session.lastPage everytime the webpage is visited
    res.send('Welcome to a!')
})

app.get('/b', function(req, res){
    if (req.session.lastPage) {
        console.log('Last page was: ' + req.session.lastPage + '.')    
    }

    req.session.lastPage = '/b'  
    res.send('Welcome to b!')
})

app.get('/c', function(req, res){
    if (req.session.lastPage){
        console.log("Last page was: " + req.session.lastPage + '.')    
    }

    req.session.lastPage = '/c'
    res.send('Welcome to c!')
})