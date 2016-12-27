OnceDoc is a managment system with high perforance and independence for enterprise contents. Based on the OnceIO Web frame, it can achieve modular storage and dynamic routing for Web.The front-end, backstage and the database definition are all saved in the same extension package. Every package represents an application with specific function， which could be realized or removed simply through add/delete the folder acquired from the package decompression. Anyone could install the module within 5 seconds. With the module extension package, you can extend your OnceDoc into mailbox, procedure management, community share, assets management, shopping center, etc. If any custome-built extension is desired, please contact us.

#### First step. Download the module extension package
Please login your OnceDoc account and click "my purchase" to select the order nummer. Download the wanted OnceDoc extension package, e.g. the mailbox module "mail".
Please first download the module extension package. 
![module extension package][1]

#### Second step. Install the module extension package
After you have download the mail module, decompress it and place it under the catalog of "/oncedoc/mod". Attention, there is already a folder named 'mail' under the root catalog "/oncedoc", which is different from the one to be appended.
![decompression package][2]

#### Third step. Restart OnceDoc

After restarting the OnceDoc, the newly appended mail module will be automatically loaded. You could use twice 'ctrl+c' to realize quick restart. Now, the files with extension name of ".eml" could be automatic parsed. If you'd like to send or receive any email, you have to set additional mx and spf records on the domain name.

[1]:https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/OnceDoc/module-download.png
[2]:https://raw.githubusercontent.com/OnceDoc/images/gh-pages/OnceAcademy/OnceDoc/module-install.png