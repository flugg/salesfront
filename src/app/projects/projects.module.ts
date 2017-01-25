import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { ProjectsComponent } from "./projects.component";
import { ProjectsRoutingModule } from "./projects-routing.module";
import { ScoreboardModule } from "./scoreboard/scoreboard.module";
import { ProjectslistComponent } from './projectslist/projectslist.component';
import { FeedModule } from "./feed/feed.module";

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectslistComponent
  ],
  imports: [
    SharedModule,
    ProjectsRoutingModule,
    ScoreboardModule,
    FeedModule
  ]
})

export class ProjectsModule {}
