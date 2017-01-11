# OnceAcademy
### Lesson 5 -   
Three main form data transmission methods (GET, POST, both GET and POST)
#### Acquire QueryString data in GET 

In the Internet, QueryString is part of the address, which contrains the data to be transmitted to the backstage. It usually starts with '?' and breaks up with '&', for example "/form/get_form.asp/?param1=1234$param2=5678". When the form is submitted, it would send the data to the backstage in form of QueryString by default. OnceIO will save it in the req.query object. 
   
Create server file 'websvr.js' and website file 'form.html' in the project folder.
   
websvr.js code is as follows: 

    var onceio = require('../onceio/onceio')

    var app = onceio({
        home   :  "./"
      , port   :  8054
      , listDir:  true
      , debug  :  false
    })

    app.get('/form', function(req, res) {
      res.render('form.html')
    })

    //Handling form-data sent through the GET method
    app.get('/form/get_form.asp', function(req, res) {
      res.write('Received the form-data:\n')
      res.send('req.query: ' + JSON.stringify(req.query))
    })  

form.html code is as follows：  
    
    <!DOCTYPE html>
    <html>
    <body>
      <p>Form that sends data through the GET method:</p>
      <form action="/form/get_form.asp" method="get">
        <p>Parameter 1: <input type="text" name="param1" value="GET1" /></p>
        <p>Parameter 2: <input type="text" name="param2" value="GET2" /></p>
        <input type="submit" value="Submit" />
      </form>
    </body>
    </html> 
 
Operate the server, open localhost:8054/form in the browser to get the following result:

![GET browse effect][1]    

When you submit, the browser would display the form data in req.query which in received by the server, the URL in the address shows all the parameters in the form, including name and value: 

![GET submit browser effect][2] 

#### Acquire data in POST 

GET saves the data in the address, however the data quantity stored in the address is limited. On the contrary, POST saves the data in the Request Body. OnceIO stores the POST received data in req.body.

Substitute app.get('/form/get_form.asp', function(req, res)) in websvr.js as：  

    //Handling form-data sent through the POST method
    app.post('/form/post_form.asp', function(req, res) {
      res.write('Received the form-data:\n')
      res.send('req.body: ' + JSON.stringify(req.body))
    })  
    
Substitute the main content in the form.html file as:

    <p>Form that sends data through the POST method:</p>
    <form action="/form/post_form.asp" method="post">
      <p>Parameter 1: <input type="text" name="param1" value="POST1" /></p>
      <p>Parameter 2: <input type="text" name="param2" value="POST2" /></p>
      <input type="submit" value="Submit" />
    </form> 

Restart the server and open up localhost:8054/form in the browser to get the following result:  

![POST Browser Effect][3]    

When you click sumbit, the browser will display the form data stored in req.body, which is received by the server. No form data will be displayed on the address bar. 

![POST Submit Browser Effect][4]
  
#### Acquire the variables in Router and usage of GET/POST together
 
User could also assign part of the Router to be variables, for example '/form/get_and_post_form.asp/:routeParam'. OnceIO would save the value of routeParam in req.params.
 
app.url interface would support GET and POST simultaneously. Substitute app.post('/form/post_form.asp', function(req, res)) in websvr.js as：  

    //Handling form-data sent through the GET method and the POST method
    app.url('/form/get_and_post_form.asp/:routeParam', function(req, res) {
      res.write('Received the form-data:\n')
      res.write('req.params: ' + JSON.stringify(req.params) + '\n')
      res.write('req.query: ' + JSON.stringify(req.query) + '\n')
      res.send('req.body: ' + JSON.stringify(req.body))
    }, 'qs')  

In order to decrease I/O, app.url() will not load req.body by default, if it is necessary to liad, set its third parameter as 'qs' or {POST : 'qs'}.  
 
Substitute the content in body of the form.html as:

    <p>Form that sends data through the GET method and the POST method:</p>
    <form action="/form/get_and_post_form.asp/ROUTE/?getParam=GET" method="post">
      <p>POST Parameter 1: <input type="text" name="postParam1" value="POST1" /></p>
      <p>POST Parameter 2: <input type="text" name="postParam2" value="POST2" /></p>
      <input type="submit" value="Submit" />
    </form> 

This form uses three data transmitting methods at the same time: the action attribute in the form uses '/' to seperate the URL parameter and send it to req.params; uses '?' to send the URL parameter to send it to req.query; uses POST to send the input items in the form to req.body.
 
Restart the server and open up the localhost:8054/form in the browser to get the following result:

![GET&POST Browser Effect][5]    

  
After submission, the website would display the form data received in the server, containing req.params, req.query, req.body, while the URL in the address bar only shows the req.params and req.query data:  

![GET&POST submission browser effect][6]






  [1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson5/get_form.png
  [2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson5/get_form_submit.png
  [3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson5/post_form.png
  [4]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson5/post_form_submit.png
  [5]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson5/get_and_post_form.png
  [6]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson5/get_and_post_form_submit.png
