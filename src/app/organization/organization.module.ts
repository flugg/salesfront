import { NgModule } from '@angular/core';

import { OrganizationRoutingModule } from './organization-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationRoutingModule
  ],
  declarations: [
    ProjectListComponent
  ],
  providers: []
})
export class OrganizationModule {}
