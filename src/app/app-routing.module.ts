import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/auth-guard.service';
import { NoAuthGuard } from './core/auth/no-auth-guard.service';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationResolver } from './organization-list/organization-resolver.service';
import { OrganizationGuard } from './organization-list/organization-guard.service';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: OrganizationListComponent,
    children: [
      {
        path: ':organization',
        canActivate: [OrganizationGuard],
        loadChildren: 'app/organization/organization.module#OrganizationModule'
      }
    ]
  },
  {
    path: '',
    loadChildren: 'app/errors/errors.module#ErrorsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, NoAuthGuard]
})
export class AppRoutingModule {
}
