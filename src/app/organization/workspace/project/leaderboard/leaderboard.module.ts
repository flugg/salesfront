import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { WorkspaceSharedModule } from '../../shared/workspace-shared.module';
import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { LeaderboardTabsComponent } from './leaderboard-tabs/leaderboard-tabs.component';
import { UserListComponent } from './leaderboard-tabs/user-list/user-list.component';
import { TeamListComponent } from './leaderboard-tabs/team-list/team-list.component';
import { TeamComponent } from './leaderboard-tabs/team-list/team/team.component';
import { LeaderboardService } from './shared/leaderboard.service';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { DatepickerService } from './shared/datepicker/datepicker.service';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    LeaderboardRoutingModule
  ],
  declarations: [
    LeaderboardTabsComponent,
    UserListComponent,
    TeamListComponent,
    TeamComponent,
    DatepickerComponent
  ],
  providers: [
    LeaderboardService,
    DatepickerService
  ]
})
export class LeaderboardModule {}
