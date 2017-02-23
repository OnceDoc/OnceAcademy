# OnceAcademy
### Lesson 10 - Web file nesting 


OnceIO 
offers a mechanism to nest one web page inside another. File nesting is irrelevent with the template engine and supports deep nesting of template. The grammer is `<!--#include="path"--> `, where path is the relative path of the file, the quotation marks should be doubled and without blank. Take index.html code as example:

	<!DOCTYPE html>
	<html>
	<body>
	  <!--#include="header.html"--> 
	  <div> 
	    Main content 
	  </div>
	  <!--#include="footer.html"--> 
	</body>
	</html>

The code nests header.html and footer.html inside index.html. When the user visits index.html, header.html and footer.html will also be loaded, and its element will be displayed on the corresponding place.
  
header.html code is:

	<div>
	  <center>
	    Header
	  </center>
	  <hr>
	</div>

footer.html code is:

	<div class='footer'>
	  <hr>
	  <center>
	    Footer
	  </center>
	</div>
  
index.html display effect is:  
  
![index.html display effect][1] 
  
There is no limit to the number of the nested layers theoretically, which means a nested web page could also nest other pages.  However, mutual nesting loop might result in problem. For example ,if header.html nests and is also nested in index.html, the index.html displays as:
  
![mutual nesting effect of index.html][2] 
  

When using web page nesting, the server needs time to load all the nested page. Therefore, when the user visits for the first time, the browser might not be able to display the content of the nested web page until refresh. The OnceIO built-in preload method could solve the problem. Code for applying preload method on the html file under the current directory is shown below:

	app.preload('.', '.html')


The first parameter of preload is the relative path, as the '.' represents the path of home, home is the first property of the OnceIO application, which can be set in the application definition with the default value as './', refering to the current catalog. The second parameter in preload is the file type, the '.tmpl' in the example represents the dynamic web page files.

After using preload, the server will load and cache the web file in advance, so that, the user will see the complete web page at the first visit without refreshness.




[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/webpage_nesting/index_webpage.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/webpage_nesting/mutual_nesting.png
