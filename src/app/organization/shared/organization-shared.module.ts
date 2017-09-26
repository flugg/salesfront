import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SaleService } from '../../core/services/sale.service';
import { SharedModule } from '../../shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  providers: [
    SaleService
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ]
})
export class OrganizationSharedModule {}