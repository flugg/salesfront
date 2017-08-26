import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { CreateProjectComponent } from './create-project/create-project.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationRoutingModule
  ],
  declarations: [
    OrganizationComponent,
    CreateProjectComponent
  ],
  entryComponents: [
    CreateProjectComponent]
})
export class OrganizationModule {}
