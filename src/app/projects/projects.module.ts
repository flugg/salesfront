/**
 * Created by astrofeet on 18.01.17.
 */
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { ProjectsComponent } from "./projects.component";
import { ProjectsRoutingModule } from "./projects-routing.module";
import { ScoreboardModule } from "./scoreboard/scoreboard.module";
import { ProjectslistComponent } from './projectslist/projectslist.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectslistComponent
  ],
  imports: [
    SharedModule,
    ProjectsRoutingModule,
    ScoreboardModule
  ]
})

export class ProjectsModule {}
