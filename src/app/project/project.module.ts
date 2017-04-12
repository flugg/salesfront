import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectService } from './project.service';
import { ProjectListComponent } from '../project-list/project-list.component';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,
  ],
  declarations: [
      ProjectListComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectModule {}
