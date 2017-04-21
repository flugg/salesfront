import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { TeamService } from './team.service';

@NgModule({
  imports: [
    SharedModule,
    TeamsRoutingModule
  ],
  declarations: [
    TeamsComponent
  ],
  providers: [
      TeamService
  ]
})
export class TeamsModule {}
