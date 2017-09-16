import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDatepickerModule, MdDialogModule, MdIconModule, MdInputModule, MdLineModule, MdListModule, MdNativeDateModule, MdProgressSpinnerModule, MdRadioModule, MdSelectModule, MdSidenavModule, MdSlideToggleModule, MdSnackBarModule, MdTableModule, MdTabsModule, MdToolbarModule, MdTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';
import { CountoModule } from 'angular2-counto';

import { LoadMoreButtonComponent } from './load-more-button/load-more-button.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ExcludePipe } from './exclude.pipe';
import { Nl2BrPipe } from './nl2br.pipe';
import { ValuePipe } from './value.pipe';
import { ProjectIconComponent } from './project-icon/project-icon.component';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
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
    MdSlideToggleModule,
    MdTableModule,
    MdButtonToggleModule,
    MdRadioModule,
    MomentModule,
    LoadMoreButtonComponent,
    ProgressSpinnerComponent,
    AvatarComponent,
    ProjectIconComponent,
    ExcludePipe,
    Nl2BrPipe,
    ValuePipe,
    CountoModule,
    SignaturePadModule
  ],
  declarations: [
    LoadMoreButtonComponent,
    ProgressSpinnerComponent,
    AvatarComponent,
    ProjectIconComponent,
    ExcludePipe,
    Nl2BrPipe,
    ValuePipe
  ],
  providers: [
    DecimalPipe
  ]
})
export class SharedModule {}