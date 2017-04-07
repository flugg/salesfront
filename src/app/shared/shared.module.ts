import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';

import { ExcludePipe } from './exclude.pipe';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    MomentModule,
    ExcludePipe,
    ToolbarComponent,
    LoaderComponent
  ],
  declarations: [
    ExcludePipe,
    ToolbarComponent,
    LoaderComponent
  ]
})
export class SharedModule {}