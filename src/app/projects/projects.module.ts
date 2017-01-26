import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { ProjectsComponent } from "./projects.component";
import { ProjectsRoutingModule } from "./projects-routing.module";
import { ProjectslistComponent } from './projectslist/projectslist.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectslistComponent,
  ],
  imports: [
    SharedModule,
    ProjectsRoutingModule
  ]
})

export class ProjectsModule {}
