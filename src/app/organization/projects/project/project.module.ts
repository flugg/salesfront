import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { InviteService } from './users/invite.service';
import { LeaderboardService } from './leaderboard/leaderboard.service';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule
  ],
  declarations: [
    ProjectComponent
  ],
  providers: [
    InviteService,
    LeaderboardService
  ]
})
export class ProjectModule {}
