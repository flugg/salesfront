import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule, RequestOptions, Http } from '@angular/http'
import { MaterialModule } from "@angular/material"
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import 'hammerjs'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { NavItemComponent } from './header/nav-item/nav-item.component'
import { AppRoutingModule } from './app-routing.module'
import { ApiService } from './api.service'
import { AuthService } from './auth/auth.service'
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { ProjectsModule } from "./projects/projects.module";
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { ErrorsRouting } from "./errors/errors-routing.module";
import { WebsocketService } from "./websocket.service";
import { DataProviderService } from "./data-provider.service";
import { ConversationsService } from "./user/conversations/conversations.service";
import { MessageService } from "./user/conversations/conversation/message.service";
import { SharedModule } from "./shared/shared.module";
import { UserService } from "./user/user.service";
import { ProjectService } from "./projects/project.service";
import { LayoutModule } from "ng2-flex-layout";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavItemComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    LayoutModule,
    AppRoutingModule,
    SharedModule,
    ProjectsModule,
    ErrorsRouting
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    AuthService,
    ApiService,
    WebsocketService,
    DataProviderService,
    AuthGuard,
    ConversationsService,
    MessageService,
    UserService,
    ProjectService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
