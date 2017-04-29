import { NgModule } from '@angular/core';

import { OrganizationRoutingModule } from './organization-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationRoutingModule
  ],
  declarations: [
    CreateProjectComponent,
    ProjectListComponent
  ]
})
export class OrganizationModule {}
