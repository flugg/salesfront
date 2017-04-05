import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';

@NgModule({
  imports: [
    SharedModule,
    TeamsRoutingModule,
  ],
  declarations: [
    TeamsComponent,
  ],
})
export class TeamsModule {}
