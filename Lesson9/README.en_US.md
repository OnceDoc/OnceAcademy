# OnceAcademy
### Lesson 9 - Server cache   
 
The web resource between the server and client (browser) can not only be saved on the client, but also on the server. The cache saves the copy of the required content on the internal storage of the server. Then, if the next request acquires for the same URL and the page is not updated, the server will use the web page saved in the cache instead of getting the content from the HD again, so as to save bandwidth and reduce latency.
 
Following we will introduce some functions and properties of OnceIO, which are related with server cache.

#### Server cache empty function app.clear()

app.clear()  could clear the server internal storage to delete the server cache. Normally, only the administrators have the right to call this function, the examplary function is as follows:

    app.get('/clear', function(req, res) {
      app.clear()
    }) 
 
Visit the '/clear' path, the server cache will be cleaned out.
 
#### Static file server cache control fileCacheSize

fileCacheSize is the maximal size of the static file saved in the server cache. Any file larger than this size will not be saved. fileCacheSize can be set in the application definition. Its default value is 0, which means no static file is saved in the server cache, examplary code as follows:

    var app = onceio({
      fileCacheSize: 1024 * 1024
    })
 
fileCacheSize unit is in Byte, 1024*2014 represents for 1MB. fileCacheSize size is suggested to be 1~2 MB. If it is too big, OnceIO internal storage will be greatly occupied and the compression process will cost a lot of time.  
  
When a path is visited for the first time, OnceIO will automatically save the response files smaller than fileCacheSize in the internal storage and compress them individually with gzip before storing. When the path is visited again, the server can directly send the files saved in OnceIO internal storage without acquiring it again from the HD. Whether the compressed version can be sent is determined by whether the user browser support gzip.

Usually, for each URL, the server only need to carry out I/O once with the HD, which is also where the name of OnceIO comes from.

fileCacheSize is 0 means the server cache mechanism is disabled. When a client without a client cache accesses a path that has been accessed by other users, the Network bar in the browser developer tool is as follows   
  
![Network bar effect without using server cache mechanism][1]
   
With other conditions unchanged, when the server sends response with the gzip compression package, the Network bar effect with server cache mechanism is as follows:

![Network bar effect with server cache mechanism][2]  

Different with the browser cache, the server cache doesn't have the ability to check the validity of the cache files. Thus, everytime the backstage file is modified, the developer has to restart the server and use app.clear() to ensure that the cache in server internal storage is always fresh. Normally, everytime when a new version of node application is released or deployed, it is necessary to restart the nodejs process. With the help of the long term session storage mechanism like redis, the restart process can be complete in several seconds without interfering the session dialogue status of the current user.

#### Server template file cache

##### templateCache

templateCache is false in default, even not to save the template files or other dynamic files at the server. Its value could be set in application definition, examplary code as follows:

    var app = onceio({
       templateCache: true
    })

When templateCache is true, the template files could be cached in the server internal storage. Unless the server is restarted, the template file will not be updated.
 
##### Template nesting and preload

It is sometimes complicated to deal with template nesting, because there might be cases with mulit-nesting and it takes some time to load all the template. OnceIO employs a cache pool to store such nested template files: the cache pool is empty at the first visit of the user and the nested web page can not be rendered at the first time. Users need to refresh it agian to complete the update of the template file in the cache. Following is the common code of template nesting in OnceIO and supports all template engine.

        <!--#include="/analytics.tmpl"-->
  
OnceIO built-in preload
The method loads all template files under a certain catelog in advance to preload the cache pool. app.clear() doesn't influence the content in preload. Code for applying preload on tmpl file under the current catalog is as follows:


	app.preload('.', '.tmpl')

The first parameter of preload is the relative path, as the '.' represents the path of home in web, home is the first property of the OnceIO application, which can be defined in the application definition with the default value as './', refering to the current catalog. The second parameter in preload is the file type, the '.tmpl' in the example represents the dynamic web page files.

After use preload, the server could load the template file in advance and save it even without request from the client. When the templateCache is set as true, the user can get the rendered web page without the server fetching the template file from the HD.
  




[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/no_fileCacheSize_browser_network.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/fileCacheSize_set_browser_network.png
