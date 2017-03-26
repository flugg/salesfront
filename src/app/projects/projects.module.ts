import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectslistComponent } from './projectslist/projectslist.component';
import { ScoreboardModule } from './scoreboard/scoreboard.module';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectslistComponent,
  ],
  imports: [
    SharedModule,
    ScoreboardModule,
    ProjectsRoutingModule,
  ],
})

export class ProjectsModule {
}
