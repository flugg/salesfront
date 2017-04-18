import { NgModule } from '@angular/core';

import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  imports: [
    SharedModule,
    AccountsRoutingModule
  ],
  declarations: [
      ProjectListComponent
  ],
  providers: [
  ]
})
export class AccountsModule { }
