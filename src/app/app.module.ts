import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from "@angular/material"
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
import { UserService } from "./projects/users/user.service";
import { WebsocketService } from "./websocket.service";
import { DataProviderService } from "./data-provider.service";
import { ConversationsService } from "./user/conversations/conversations.service";
import { ConversationService } from "./user/conversations/conversation/conversation.service";
import { SharedModule } from "./shared/shared.module";

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
    MaterialModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    ProjectsModule,
    ErrorsRouting
  ],
  providers: [
    ApiService,
    WebsocketService,
    DataProviderService,
    AuthGuard,
    AuthService,
    UserService,
    ConversationsService,
    ConversationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
