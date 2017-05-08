import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { BudgetsRoutingModule } from './budgets-routing.module';
import { BudgetsComponent } from './budgets.component';

@NgModule({
  imports: [
    SharedModule,
    BudgetsRoutingModule
  ],
  declarations: [
    BudgetsComponent
  ]
})
export class BudgetsModule {}
