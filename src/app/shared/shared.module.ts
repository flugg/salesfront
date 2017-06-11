import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDatepickerModule, MdDialogModule, MdIconModule, MdInputModule, MdLineModule, MdListModule, MdNativeDateModule, MdProgressSpinnerModule, MdSelectModule, MdSidenavModule, MdSnackBarModule, MdTabsModule, MdToolbarModule, MdTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';

import { LoadMoreButtonComponent } from './load-more-button/load-more-button.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ExcludePipe } from './exclude.pipe';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MdButtonModule,
    MdProgressSpinnerModule,
    MdIconModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdLineModule,
    MdListModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdTabsModule,
    MdProgressSpinnerModule,
    MdToolbarModule,
    MdTooltipModule,
    MdCheckboxModule,
    MdSelectModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MomentModule,
    LoadMoreButtonComponent,
    ProgressSpinnerComponent,
    AvatarComponent,
    ExcludePipe
  ],
  declarations: [
    LoadMoreButtonComponent,
    ProgressSpinnerComponent,
    AvatarComponent,
    ExcludePipe
  ]
})
export class SharedModule {}