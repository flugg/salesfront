import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamsComponent } from './team-list/team-list.component';
import { TeamProfileComponent } from './team-profile/team-profile.component';
import { TeamService } from './team.service';

@NgModule({
  imports: [
    SharedModule,
    TeamsRoutingModule
  ],
  declarations: [
    CreateTeamComponent,
    TeamsComponent,
    TeamProfileComponent
  ],
  providers: [
    TeamService,
  ]
})
export class TeamsModule {}
