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
import { UserService } from './user.service'
import { ApiService } from './api.service'
import { SettingsComponent } from './projects/settings/settings.component'
import { AuthService } from './auth/auth.service'
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { ProjectsModule } from "./projects/projects.module";
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { ErrorsRouting } from "./errors/errors-routing.module";
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavItemComponent,
    SettingsComponent,
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
    UserService,
    AuthGuard,
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
