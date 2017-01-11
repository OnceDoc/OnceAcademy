# OnceAcademy
### Lesson 4 - Template engine and MVC design mode

This section mainly introduces the usage of template engine in [OnceIO](https://github.com/OnceDoc/onceio)(NodeJS). The template engine is mainly for seperation of user interface and operation data(contents). It could  fill in the template with data to generate HTML, which represents the MVC(Model-view-controller)design mode naturally. MVC mode is a dynamic program design framework, which organizes the code based on an approach of isolated business logic, data and interface. It simplifies the modification and expansion of the code, and make reuse of part of the code possible.

![backup MVC sketchup][1]

#### Model  
 
The model is applied for encapsulating the relevant data of the business logic of the application program. Same as other NodeJS frame, OnceIO adopts JavaScript original object JSON to represent model.
 
Model could be used in application level to be global variable, which is alive during the whole lifespan of the application, for example:

    app.model({ title: 'test_page', debug: true }) 

It could also be used in middleware and handler as local variable, which is valid only in the current request-response cycle, for example:

    app.use(function(req, res) {
      res.model({
          debug   : false
        , username: 'Kris'
      })
      req.filter.next()
    })

    app.get('/view', function(req, res) { 
      var userModel = { username: 'Rex' }
      res.render('model.html', userModel)
    })
  

When global or local model exist at the same time, they will be automatically combined. If there is duplicated property, the model in the handler will cover that in middleware, the local model will cover the global one. For example, when all code above exist in the server, userModel will be combined with res.model and covers its username property. Then the combined model will merge with app.model to cover the debug property. Finially, the properties in the '\view' path are:

![Model merge browser display model][2]

#### View  
  
View could be used to display data specifically, corresponding to html file in the project file, for example the model.html in the folder.

Template engine could transform the specified format into business data.  For example, in the following code, the title, debug and username in the model would influence the displayed contant. OnceIO adopts the default [doT](https://github.com/olado/doT) template engine with excellent performance and simple rules. Of course you could alter into your familiar template engine, such as EJS or PUG(jade).

    <!DOCTYPE html>
    <html>
    <body>
      <h1> Title: {{=it.title}} </h1>
      <h1> Debug: {{=it.debug}} </h1>
      <h1> Username: {{=it.username}} </h1>
    </body>
    </html>
  
#### Controller
 
Controller are used to control the workflow in the application, to process events and give response. It corresponds to the server file in the project folder, for example the websvr.js in the folder:
  
   
We could use the controller to operate on the model, for example in the following code, the controller assigns the URL parameter to the userModel property in the model, so that the user could change the input URL to change the model as well as the view. The controller fill userModel into the model.html to render it to a real HTML through the res.render in the response object.

    app.get('/view/user/:username', function(req, res) { 
      var userModel = { username: req.params.username }
      res.render('model.html', userModel)
    })

The code effect are shown below：

![Controller effect display 1][3]  
  
![Controller effect display 2][4]





  [1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson4/MVC_process.png
  [2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson4/model_overwritten.png
  [3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson4/controller_example_1.png
  [4]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/Lesson4/controller_example_2.png
