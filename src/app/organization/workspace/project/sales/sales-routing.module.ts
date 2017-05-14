import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalesListComponent } from './sales-list/sales-list.component';
import { SaleComponent } from './sale/sale.component';

const routes: Routes = [
  {
    path: '',
    component: SalesListComponent,
    children: [
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
