import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DatepickerService } from './datepicker/datepicker.service';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  providers: [
    DatepickerService
  ],
  declarations: [
    ToolbarComponent,
    DatepickerComponent
  ],
  exports: [
    ToolbarComponent,
    DatepickerComponent
  ]
})
export class OrganizationSharedModule {}