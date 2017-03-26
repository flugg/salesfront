import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ScoreboardComponent } from './scoreboard.component';
import { ScoreboardRoutingModule } from './scoreboard-routing.module';
import { ScoreboardlistsComponent } from './scoreboardlists/scoreboardlists.component';

@NgModule({
  declarations: [
    ScoreboardComponent,
    ScoreboardlistsComponent,
  ],
  imports: [
    SharedModule,
    ScoreboardRoutingModule,
  ],
})
export class ScoreboardModule {
}
