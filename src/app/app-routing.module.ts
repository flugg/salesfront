import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './auth/auth-guard.service'
import { LoginComponent } from "./auth/login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./errors/page-not-found/page-not-found.component";

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/projects/1', // TODO this and all other child routes must be modular
    pathMatch: 'full'
  },
  {
    path: 'projects/:id',
    loadChildren: 'app/projects/projects.module#ProjectsModule',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: ':id',
        component: ProfileComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
