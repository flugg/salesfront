import { Routes } from '@angular/router'

import { FeedComponent } from './feed.component'

export const feedRoutes: Routes = [
    { path: '', redirectTo: '/feed', pathMatch: 'full' },
    { path: 'feed', component: FeedComponent }
]