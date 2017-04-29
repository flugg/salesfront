import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { LeaderboardComponent } from './leaderboard.component';
import { TeamComponent } from './team/team.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    SharedModule,
    LeaderboardRoutingModule
  ],
  declarations: [
    LeaderboardComponent,
    TeamComponent,
    UsersComponent
  ]
})
export class LeaderboardModule {}
