import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,
  ],
  declarations: [],
  providers: []
})
export class ProjectModule {}
