# OnceAcademy
### Lesson 6 - Router   
#### Router definition 

Routing is used to determine how the application responds to client requests for a particular endpoint, including a URL(or path) and a specific HTTP request method(GET, POST, etc.).
 
Every router could have one or more handler functions, which would be executed during the router is matched. 
   
Router definition adopts the following structure:

    app.METHOD(PATH, HANDLER)

in which：  
  - app is OnceIO example.  
  - METHOD is HTTP request method, e.g. get/post.  
  - PATH is the router path on the server.  
  - HANDLER is the function to be executed when the router is matched.

#### Router path
  
Multiple pathes could be expressed in array, for example:

The router path will match apple, banana or strawberry

    app.get(['/apple', '/banana', '/strawberry'], function(req, res) {
      res.send('fruit')
    })

Path could be in regular expression, such as:

This router path could match abcd、abbcd、abbbcd, etc. '*' represents here that the letter before could either be null or appear for more than one time.

    app.get(/ab*cd/, function(req, res) {
      res.send('/ab*cd/')
    })  
  
This router path could match any router with 'a' in its path.

    app.get(/a/, function(req, res) {
      res.send('/a/')
    })

This router will match pathes like butterfly and dragonfly, but not butterflyman or dragonfly man or so.

    app.get(/.*fly$/, function(req, res) {
      res.send('/.*fly$/')
    })

#### Router variables
  
Variables could also be added in the path, for example:

This router path could match all the routers. The contents between the first and second slash would be saved in req.params.id. For example, if the path is like  '/1234/5678', value of req.params.id would be '1234'.

    app.get('/:id/:id2', function(req, res){
      res.send(req.params.id)
    })
  
The third parameter of the router could be set as { mode: 'loose'}, the router path could match every router begins with the specific text. For example：

This router path would match every router begins with '/OnceAcademy', like '/OnceAcademy', '/OnceAcademy/routering' or '/OnceAcademy/middleware', but it would not match '/OnceAcademyRouting'、'/OnceAcademyMiddleware'. 

    app.get('/OnceAcademy', function(req, res) {
      res.send('OnceAcademy')
    }, { mode: 'loose' })



#### Respond method 

The res object in the following form could send response to the client and terminate the request/response loop. If you have not called any of these method in the router handler function, the client request will remain pending.
 
| Method                             | Description                                                |
| -------------------------------- | --------------------------------------------------- |
| res.end()                        | End the response process                            |
| res.redirect()                   | Redirect the request                                      |
| res.send(statusCode, text)       | Set the response status code (default 200) and send the character array in form of the response subject when text is empty.text is optional parameter, it could either be html file, json variable or so                                           |
| res.send(json)                   | Send JSON response                                    |
| res.sendFile()                   | Send the file in form of byte stream                              |
| res.cookie(name, value, options) | Set name and value of cookie, and send it together with the response        |





