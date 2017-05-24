import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectService } from './shared/project.service';
import { UserService } from './shared/user.service';
import { MembershipService } from './shared/membership.service';

@NgModule({
  imports: [
    SharedModule,
    OrganizationRoutingModule
  ],
  declarations: [
    OrganizationComponent,
    CreateProjectComponent,
    ProjectListComponent
  ],
  providers: [
    ProjectService,
    UserService,
    MembershipService
  ]
})
export class OrganizationModule {}
