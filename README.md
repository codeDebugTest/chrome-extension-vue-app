# chrome-extension-vue-app
## extension-vue-app
> 1. 选项页面option与弹出页面app分开单独编译
> 2. 编译后生成crx文件夹，在chrome开发者模式下-->加载已解压的扩展程序
> 3. 编译：Webpack + vue-loader 可以在 CSP 环境中完美运行。


## chrome 插件开发指南：
* manifest.json 
  - chrome 插件配置文件，可以看作插件的‘入口’
* permissions
  - 允许插件做哪些事情，访问哪些站点.
  - 假如一个插件的"permissions"里写有“http://*.hacker.com/”，那么这个插件就被允许访hacker.com上的所有内容.
* page action
  - 指定插件图标，标题，弹出页面的html
* background
  - 可以认为是chrome插件的主程序。插件被启用时，chrome就给插件开辟了一个独立的javascript运行环境，用来跑指定的js脚本。
* content script
  - 要注入到页面中的脚本，插件允许我们往网页中注入脚本.
* [google开发文档](https://crxdoc-zh.appspot.com/extensions/devguide)

## Content Security Policy 
> ### Google官方及文档:
>  1. [Content Security Policy (CSP)](https://developer.chrome.com/extensions/contentSecurityPolicy)
>  2. [An Introduction to Content Security Policy](https://www.html5rocks.com/en/tutorials/security/content-security-policy/)
>  3. [Content Security Policy Reference](https://content-security-policy.com/)
>  4. [Content Security Policy Level 3](https://w3c.github.io/webappsec-csp/)
 
 ---
 
> ### [vue 官网:](https://cn.vuejs.org/v2/guide/installation.html#CSP-%E7%8E%AF%E5%A2%83)
   有些环境，如 Google Chrome Apps，会强制应用内容安全策略 (CSP)，不能使用 new Function() 对表达式求值。这时可以用 CSP 兼容版本

---

>  ### CSP指北：
> 1. manifest_version为2的扩展才会默认开启内容安全策略。
> 2. 没有定义 manifest_version 的扩展安装包默认是没有内容安全策略的。
> 3. Inline JavaScript和eval一样危险，将不会被执行，CSP规则将同时禁止内嵌
> 4. 只有扩展包内的脚本和资源才会被加载！通过Web即时下载的将不会被加载！ 这确保您的扩展只执行已经打包在扩展之中的可信代码，从而避免了线上的网络攻击者通过恶意重定向您所请求的Web资源所带来的安全隐患。
> 5. ***放宽默认策略*** 通过添加 'unsafe-eval' 来实现，即在mainfest.json中加入下面代码：
>   ```javascript
>   {
>      ...
>      "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
>      ...
>   }
>   ```
> 6. **怎样引入外部的JavaScript或者资源** 可以通过将HTTPS源的脚本加入白名单来放宽“只加载本地脚本和资源”策略。如：
>  ```javascript
> {
>      ...
>      "content_security_policy": "script-src 'self' 'unsafe-eval' https://maps.googleapis.com/; object-src 'self'",
>      ...
>  }
>  ```
    

