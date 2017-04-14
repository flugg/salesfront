import { NgModule } from '@angular/core';

import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectModule } from '../project/project.module';

@NgModule({
  imports: [
    SharedModule,
    AccountsRoutingModule,
    ProjectModule
  ],
  declarations: [
      ProjectListComponent
  ],
  providers: [
  ]
})
export class AccountsModule { }
