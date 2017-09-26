import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { OrganizationSharedModule } from '../shared/organization-shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { ActiveProjectResolver } from './active-project-resolver.service';
import { ProjectComponent } from './project.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
    ProjectRoutingModule
  ],
  providers: [ActiveProjectResolver],
  declarations: [ProjectComponent]
})
export class ProjectModule {}
