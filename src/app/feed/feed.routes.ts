import { Routes } from '@angular/router'

import { FeedComponent } from './feed.component'
import {AuthGuard} from "../auth/auth-guard.service";

export const feedRoutes: Routes = [
    { path: '', redirectTo: '/feed', pathMatch: 'full' },
    { path: 'feed', component: FeedComponent, canActivate: [AuthGuard] }
]
