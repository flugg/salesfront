import { NgModule } from '@angular/core'

import { MaterialModule } from '@angular/material'
import { CommonModule } from '@angular/common';
import { ClickedOutsideDirective } from './clicked-outside.directive'

@NgModule({
    exports: [CommonModule, MaterialModule],
    declarations: [ClickedOutsideDirective]
})
export class SharedModule { }