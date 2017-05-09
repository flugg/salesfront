import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { SalesDialogComponent } from './sales-dialog/sales-dialog.component';
import { SalesConfirmationComponent } from './sales-confirmation/sales-confirmation.component';
import { ActiveProjectService } from '../core/active-project.service';
import { ActiveUserService } from '../core/auth/active-user.service';
import { SaleService } from './shared/sale.service';

@NgModule({
  imports: [
    SharedModule,
    OrganizationRoutingModule
  ],
  declarations: [
    OrganizationComponent,
    SalesDialogComponent,
    SalesConfirmationComponent
  ],
  providers: [
    ActiveProjectService,
    ActiveUserService,
    SaleService
  ],
  entryComponents: [
    SalesDialogComponent,
    SalesConfirmationComponent
  ]
})
export class OrganizationModule {}
