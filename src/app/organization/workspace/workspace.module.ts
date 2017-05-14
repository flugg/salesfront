import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { SalesConfirmationComponent } from './sales-confirmation/sales-confirmation.component';
import { WorkspaceSharedModule } from './shared/workspace-shared.module';
import { ActiveProjectService } from './shared/active-project.service';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    WorkspaceRoutingModule
  ],
  declarations: [
    WorkspaceComponent,
    SalesConfirmationComponent
  ],
  entryComponents: [
    SalesConfirmationComponent
  ],
  providers: [
    ActiveProjectService
  ]
})
export class WorkspaceModule {}
