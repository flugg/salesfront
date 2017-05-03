import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamsComponent } from './teams.component';
import { TeamComponent } from './team/team.component';
import { TeamService } from './team.service';

@NgModule({
  imports: [
    SharedModule,
    TeamsRoutingModule
  ],
  declarations: [
    CreateTeamComponent,
    TeamsComponent,
    TeamComponent
  ],
  providers: [
    TeamService,
  ]
})
export class TeamsModule {}
