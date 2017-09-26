import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamListComponent } from './wall-of-fame-tabs/team-list/team-list.component';
import { DailyAwardListComponent } from './wall-of-fame-tabs/user-list/daily-awards/daily-award-list.component';
import { UserListComponent } from './wall-of-fame-tabs/user-list/user-list.component';
import { WallOfFameTabsComponent } from './wall-of-fame-tabs/wall-of-fame-tabs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'teams',
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
        component: UserListComponent,
        children: [
          {
            path: 'daily',
            component: DailyAwardListComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WallOfFameRoutingModule {}
