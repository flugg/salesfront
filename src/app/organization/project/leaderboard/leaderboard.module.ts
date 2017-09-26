import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { OrganizationSharedModule } from '../../shared/organization-shared.module';
import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { DatepickerService } from './shared/datepicker/datepicker.service';
import { LeaderboardTabsComponent } from './leaderboard-tabs/leaderboard-tabs.component';
import { TeamListComponent } from './leaderboard-tabs/team-list/team-list.component';
import { TeamComponent } from './leaderboard-tabs/team-list/team/team.component';
import { UserListComponent } from './leaderboard-tabs/user-list/user-list.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
    LeaderboardRoutingModule
  ],
  providers: [
    DatepickerService
  ],
  declarations: [
    LeaderboardTabsComponent,
    UserListComponent,
    TeamListComponent,
    TeamComponent,
    DatepickerComponent
  ]
})
export class LeaderboardModule {}
