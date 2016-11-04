var onceio = require('../onceio/onceio')
var app = onceio()


app.use('/', function(req, res){
    req.filter.next()
}, {session: ture})


app.get('/awesome', function(req, res){
    
    if(req.session.lastPage) {
        console.log('Last page was: ' + req.session.lastPage + ".")    
    }    
    req.session.lastPage = '/awesome' //每一次访问时，session对象的lastPage会自动的保存或更新内存中的session中去。
    res.send("You're Awesome. And the session expired time is: " + req.session.cookie.maxAge)
})

app.get('/radical', function(req, res){
    if (req.session.lastPage) {
        console.log('Last page was: ' + req.session.lastPage + ".")    
    }
    req.session.lastPage = '/radical'  
    res.send('What a radical visit! And the session expired time is: ' + req.session.cookie.maxAge)
})

app.get('/tubular', function(req, res){
    if (req.session.lastPage){
        console.log("Last page was: " + req.session.lastPage + ".")    
    }

    req.session.lastPage = '/tubular'
    res.send('Are you a suffer? And the session expired time is: ' + req.session.cookie.maxAge)
})