import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from '../../../shared/shared.module';
import { SaleService } from './sale.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent
  ],
  declarations: [
    ToolbarComponent
  ],
  providers: [
    SaleService
  ]
})
export class WorkspaceSharedModule {}