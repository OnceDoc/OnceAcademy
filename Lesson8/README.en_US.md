# OnceAcademy
### Lesson 8 - Client cache    
#### Cache definition 

The cache we discuss here refers to the web cache, which is a copy of a web resource (such as html pages, pictures and files) between the server and client (browser). The cache saves a copy of the requested content based on the incoming request. Then, if the next request has the same URL and the web page is not updated during this time, the browser will use a copy of the local cache directly instead of downloading the page again.
 
Uses of the cache are:
  - save bandwidth
  - reduce latency
  - reduce server pressure

#### Server (browser) cache mechanism 
 
All the cache have a set of rules to help decide when to use the copy in the cache and when to send the request to the server again. Some of the rules are defined in the protocols (like HTTP 1.0 and 1.1), others are set by the cache administrator (e.g. DBA/Browser user/proxy server administrator and app developer).
 
For the cache in the browser, the rules are defined in the HTTP protocol header and meta tag in html page. They use the **freshness** and **checksum** to determine whether the browser could use the copy in the cache.
 
**Freshness (expiration mechanism)**
which is the period of validity of the cache copy. The browser will recognize the cache copy to be valid only when it satisfies the following rules:

  1. Consist complete expiration time control header information, and it is still within the validity period.
  2. The browser has used the cache copy and checked the freshness in a dialogue.

Once one of the two rules is satisfied, the browser will acquire the copy in the cache directly and render it. 

**Checksum (Verification mechanism)**
The server will sometimes return the resource with the Etag (Entity Tag) on the control header, which could be used as checksum for the browser request process. If the chechsum is mismatched, which indicates modification or expiration of the resource, the browser has to require the resource again.
 
#####  Common HTTP news header related with cache 

| news header    | value     | type | usage | rule |
| ----------- | ------ | ---- | ---- | ---- |
| Status Code |200 OK|ordinary|The server returns the web page sucessfully|inappropriate|
|             |304 Not Modified|ordinary|Content of the current resource (since the last visit or based on the request condition) is not modified, the server will not return the web page content|inappropriate|
|Cache-Control|max-age=315360000            |response|Point out the validity period of the cache copy, unit in second|freshness|
| Expires     |Thu, 31 Dec 2037 23:55:55 GMT|response|Allow the server to use the copy within the validity period|freshness|
|Last-Modified|Sun, 23 Oct 2016 06:36:08 GMT|response|Tell the server the latest modified time of the current resource|freshness|
|If-Modified-Since|Sun, 23 Oct 2016 06:36:08 GMT|request|If the Last-Modified is not empty when the browser sends the request for the first time, it will be sent to the server when the same resource is required for the second time.|freshness|
|ETag|978534|response|Tell the browser the only identifier of the current resource on the server(generation rules given by the server)|checksum|
|If-None-Match|978534|request|If the ETag is not empty when the browser sends the request for the first time, it will be sent to the server when the same resource is required for the second time.|checksum|

Taking visiting http://oncedoc.com/ as example, the HTTP news header of the shader.css file on the website is:   
  
![HTTP header news of shader.css file ][1]   

##### Common process of the client cache coming into effect
 
When the server receives the request, it will send back the Last-Modified and ETag of the resource within 200 OK, the client will save the resource in the cache and record the two properties. When the client sends the same request again, two news headers: If-Modified-Since and If-None-Match will be sent along with the request. The two news headers contain the Last-Modified and ETag value from response of the last request. The server judges whether the local resource has been changed through the two news headers. When they remain the same, response 304 will be sent back and the client doesn't need to download the page again. Taking visiting oncedoc.com as example, the process of the client cache coming into effect is as follows：
 
![Common process of client cache coming into effect][2]  

##### User behavior and cache 
 
When using the browser, any operation of the user could affect the cache, such as enter after inputing the address, refreshing with F5.
  
| User operation       | Expires/Cache-Controll | Last-Modified/ETag |
| --------------- | ---------------------- | ------------------ |
| Address bar enter     | Valid                  |Valid               |
| Page link jump    | Valid                  |Valid               |
| Open new window        | Valid                  |Valid               |
| Forward and backward        | Valid                  |Valid               |
| F5 refresh        | Invalid                |Valid               |
| Ctrl+F5 force-refresh| Invalid                |Invalid             |
 
When the user uses F5 to refresh the page, the browser will ignore the setting of Expires/Cache-Control and send the request to the server again while the Last-Modified/Etag remain valid. The server will return 304 or 200 based on the real case. When the user use Cril+F5 to force a refreshing, all the cache mechanism will lose effect. The browser will download the resource again from the server and return response 200.

#### Set the client cache mechanism on the server 

##### Browser cache
  
Operate the server, visit localhost:8054/img, open the Network bar of the developer tool on the browser, address bar enter and the Network displays:

![Network bar effect using res.cache(0)][3]

The browser directly acquires the local picture resource without carrying out I/O operation between the browser and the server. The browser does not ask if the server is updated and acquires the resource from the local cache directly.

##### res.cache(0)
 
Sometimes, we might have to disable the browser cache mechanism and send the request to ask whether there is an update (such as ajax operation). A cache-control header: res.cache(0) could be used, which means losing effect after 0 second (no cache), examplary code as follows:


    app.use(function(req, res) {
      res.cache(0)
      req.filter.next()
    })

    app.get('/img', function(req, res) {
      res.render('img.html')
    }) 

 
There will be one I/O between the browser and the server. If the modified time (IF-Modify-since) of the local cache file is the same with that on the server, which means there is no modification, the OnceIO will send out 304 response (shown below) and tell the browser to get the resource form the local cache; If the file on the server is modified, the OnceIO will send 200 response to refresh the resource and send it to the browser again. 
  

![ Network bar effect without res.cache(0) ][4]
  
The server tells the browser to get the resource from the local cache with 304 response.
  
Through res.cache interface, you could set the maximal cache time based on your Release period (week, month) to optimize your application, for example, an expiration after a week is:

    res.cache(7*24*3600)

In next section we will introduce the OnceIO server format, static file cache and gzip compress mechanism, including its realization of forever usage with only one fetch.


[1]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/HTTP_headers_of_shader_css.png
[2]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/cache_workflow.png
[3]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/no_cache0_browser_network.png
[4]: https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/cache/cache0_browser_network.png
