import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WallOfFameTabsComponent } from './wall-of-fame-tabs/wall-of-fame-tabs.component';
import { TeamListComponent } from './wall-of-fame-tabs/team-list/team-list.component';
import { UserListComponent } from './wall-of-fame-tabs/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: '',
    component: WallOfFameTabsComponent,
    children: [
      {
        path: 'teams',
        component: TeamListComponent
      },
      {
        path: 'users',
        component: UserListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WallOfFameRoutingModule {
}
