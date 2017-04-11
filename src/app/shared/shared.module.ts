import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';

import { ExcludePipe } from './exclude.pipe';
import { LoadMoreButtonComponent } from './load-more-button/load-more-button.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    MomentModule,
    ExcludePipe,
    LoadMoreButtonComponent,
    ProgressSpinnerComponent,
    ToolbarComponent
  ],
  declarations: [
    ExcludePipe,
    LoadMoreButtonComponent,
    ProgressSpinnerComponent,
    ToolbarComponent
  ]
})
export class SharedModule {}