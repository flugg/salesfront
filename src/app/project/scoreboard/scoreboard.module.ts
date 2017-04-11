import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ScoreboardRoutingModule } from './scoreboard-routing.module';
import { ScoreboardComponent } from './scoreboard.component';

@NgModule({
  imports: [
    SharedModule,
    ScoreboardRoutingModule
  ],
  declarations: [
    ScoreboardComponent
  ]
})
export class ScoreboardModule {}
