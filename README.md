## PS MSAL Angular application


#### OpenID in Signle page WEB application

This application try to demonstarte the usage of Microsoft Authentication Library for Angular. Which helps to create single page WEB application with OpenID based security. 

* [msal-browser](https://www.npmjs.com/package/@azure/msal-browser)
Microsoft Authentication Library for JavaScript (MSAL.js) for Browser-Based Single-Page Applications

* [msal-angular](https://www.npmjs.com/package/@azure/msal-angular)
Microsoft Authentication Library for Angular

The application gather Access Token from the authorization server during the login, and using this token to request a 'Welcome message' from two resource servers, which secured with the mentioned authozization server. These services run with "Free F1 Service Plan", so sometimes they are not available, or takes long time to start (at the first hit).

* https://ps-servlet-api.azurewebsites.net
* https://ps-reactive-api.azurewebsites.net 

Detils about these services [here](https://github.com/aperger/service-template).

## Angular minor upgrade!

```shell
npx npm-check-updates --upgrade --target "minor" --filter "/@angular.*/"
```
