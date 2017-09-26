import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddSaleComponent } from './add-sale/add-sale.component';
import { SaleComponent } from './sale/sale.component';
import { SalesListComponent } from './sales-list/sales-list.component';

const routes: Routes = [
  {
    path: '',
    component: SalesListComponent,
    children: [
      {
        path: 'add',
        component: AddSaleComponent
      },
      {
        path: ':sale',
        component: SaleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
