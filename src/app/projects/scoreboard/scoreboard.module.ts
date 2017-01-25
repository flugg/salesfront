import { NgModule } from '@angular/core';

import { ScoreboardComponent } from './scoreboard.component';
import { SharedModule } from '../../shared/shared.module';
import {ScoreboardRoutingModule} from "./scoreboard-routing.module";

@NgModule({
  declarations: [
    ScoreboardComponent
  ],
  imports: [
    SharedModule,
    ScoreboardRoutingModule
  ]
})
export class ScoreboardModule { }
