import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"; // Import 

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication} from '@azure/msal-browser';
import { AppUrlService } from './service/app-url.service';

import { environment } from "src/environments/environment";

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

const interactionType = InteractionType.Redirect;

var globalAppUrlService: AppUrlService = new AppUrlService();

function initializeAppUrl (appUrlService: AppUrlService): () => Promise<boolean> {
  globalAppUrlService = appUrlService;
  return () => new Promise<boolean>((resolve, reject) => {
    // Do some asynchronous stuff
    resolve(true);
  });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: environment.AZURE_CLIENT_ID, // Application (client) ID from the app registration
        authority: 'https://login.microsoftonline.com/' +  environment.AZURE_TENANT_ID,  // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
        redirectUri: globalAppUrlService != null ? globalAppUrlService.appBaseUrl : 'http://localhost:4200/' // This is your registered redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }), {
      interactionType,
      authRequest: {
        scopes: ['user.read']
      }
    }, {
      interactionType,
      protectedResourceMap: new Map([ 
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]])
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppUrl,
      multi: true,
      deps: [AppUrlService],
    },
    MsalGuard // MsalGuard added as provider here
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
