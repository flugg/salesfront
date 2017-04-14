import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectService } from '../project/project.service';
import { ProjectModule } from '../project/project.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccountsRoutingModule,
    ProjectModule
  ],
  declarations: [
      ProjectListComponent
  ],
  providers: [
      ProjectService
  ]
})
export class AccountsModule { }
