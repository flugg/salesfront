import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { MaterialModule } from "@angular/material"
import 'hammerjs'
import { HeaderComponent } from './header/header.component'
import { NavItemComponent } from './header/nav-item/nav-item.component'
import { appRoutes } from './app.routes'
import { UserCardComponent } from './user-card/user-card.component'
import { UserService } from './user.service'
import { ApiService } from './api.service'
import { SettingsComponent } from './settings/settings.component'
import { SigninComponent } from './auth/signin/signin.component'
import { ProfileModule } from './profile/profile.module'
import { ScoreboardModule } from './scoreboard/scoreboard.module'
import { FeedModule } from './feed/feed.module'
import { AuthService } from './auth/auth.service'
import { AuthGuard } from './auth/auth-guard.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavItemComponent,
    UserCardComponent,
    SettingsComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ProfileModule,
    ScoreboardModule,
    FeedModule
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
