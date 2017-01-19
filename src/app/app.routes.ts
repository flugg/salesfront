import { Routes } from '@angular/router'

import { AuthGuard } from './auth/auth-guard.service'
import { ProfileComponent } from './profile/profile.component'
import { SigninComponent } from './auth/signin/signin.component'

export const appRoutes: Routes = [
  { path: '', redirectTo: '/scoreboard', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, canActivate: [AuthGuard] },
  { path: 'feed', loadChildren: 'app/feed/feed.module#FeedModule' },
  { path: 'users', component: ProfileComponent },
  { path: 'scoreboard', loadChildren: 'app/scoreboard/scoreboard.module#ScoreboardModule' }
]