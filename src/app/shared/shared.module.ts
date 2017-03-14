import { NgModule } from '@angular/core'

import { MaterialModule } from '@angular/material'
import { CommonModule } from '@angular/common';

@NgModule({
    exports: [CommonModule, MaterialModule],
    declarations: []
})
export class SharedModule { }