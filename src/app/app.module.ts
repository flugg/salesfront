import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { MaterialModule } from "@angular/material"

import Echo from "laravel-echo"


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
import { UserComponent } from './user/user.component';
import { UserService } from "./projects/users/user.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavItemComponent,
    LoginComponent,
    PageNotFoundComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),

    AppRoutingModule,
    ProjectsModule,
    ErrorsRouting
  ],
  providers: [
    ApiService,
    AuthGuard,
    AuthService,
    UserService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
