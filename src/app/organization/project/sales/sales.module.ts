import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { OrganizationSharedModule } from '../../shared/organization-shared.module';
import { SalesRoutingModule } from './sales-routing.module';
import { AddSaleComponent } from './add-sale/add-sale.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { DownloadContractDialogComponent } from './download-contracts-dialog/download-contract-dialog.component';
import { SaleComponent } from './sale/sale.component';
import { SalesListComponent } from './sales-list/sales-list.component';
import { ViewContractDialogComponent } from './view-contract-dialog/view-contract-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
    SalesRoutingModule
  ],
  declarations: [
    AddSaleComponent,
    DeleteConfirmationComponent,
    DownloadContractDialogComponent,
    SalesListComponent,
    SaleComponent,
    ViewContractDialogComponent
  ],
  entryComponents: [
    DeleteConfirmationComponent,
    DownloadContractDialogComponent,
    ViewContractDialogComponent
  ]
})
export class SalesModule {}
