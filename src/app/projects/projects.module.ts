/**
 * Created by astrofeet on 18.01.17.
 */
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { ProjectsComponent } from "./projects.component";
import { ProjectsRoutingModule } from "./projects-routing.module";
import { ScoreboardModule } from "./scoreboard/scoreboard.module";

@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    SharedModule,
    ScoreboardModule,
    ProjectsRoutingModule
  ]
})

export class ProjectsModule {}
