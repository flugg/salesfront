import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { OrganizationSharedModule } from '../../shared/organization-shared.module';
import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { LeaderboardTabsComponent } from './leaderboard-tabs/leaderboard-tabs.component';
import { TeamListComponent } from './leaderboard-tabs/team-list/team-list.component';
import { TeamComponent } from './leaderboard-tabs/team-list/team/team.component';
import { UserListComponent } from './leaderboard-tabs/user-list/user-list.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
    LeaderboardRoutingModule
  ],
  declarations: [
    LeaderboardTabsComponent,
    UserListComponent,
    TeamListComponent,
    TeamComponent
  ]
})
export class LeaderboardModule {}
