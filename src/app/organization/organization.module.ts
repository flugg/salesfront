import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { ActiveProjectService } from '../core/active-project.service';
import { ActiveUserService } from '../core/auth/active-user.service';
import { SalesDialogComponent } from './sales-dialog/sales-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationRoutingModule
  ],
  declarations: [
    OrganizationComponent,
    SalesDialogComponent
  ],
  providers: [
    ActiveProjectService,
    ActiveUserService
  ],
  entryComponents: [
    SalesDialogComponent
  ]
})
export class OrganizationModule {}
