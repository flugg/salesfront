import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { SaleComponent } from './sale/sale.component';

@NgModule({
  imports: [
    SharedModule,
    SalesRoutingModule
  ],
  declarations: [
    SalesComponent,
    SaleComponent
  ]
})
export class SalesModule {}
