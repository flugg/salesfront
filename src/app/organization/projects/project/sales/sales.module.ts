import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';

@NgModule({
  imports: [
    SharedModule,
    SalesRoutingModule
  ],
  declarations: [
    SalesComponent
  ]
})
export class SalesModule {}
