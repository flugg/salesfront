import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { WorkspaceSharedModule } from '../../shared/workspace-shared.module';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SaleComponent } from './sale/sale.component';
import { AddSaleComponent } from './add-sale/add-sale.component';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    SalesRoutingModule
  ],
  declarations: [
    SalesListComponent,
    SaleComponent,
    AddSaleComponent
  ]
})
export class SalesModule {}
