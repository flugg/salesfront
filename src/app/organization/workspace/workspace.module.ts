import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { SalesConfirmationComponent } from './sales-confirmation/sales-confirmation.component';
import { WorkspaceSharedModule } from './shared/workspace-shared.module';
import { ActiveProjectService } from './shared/active-project.service';
import { ClockInConfirmationComponent } from './clock-in-confirmation/clock-in-confirmation.component';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    WorkspaceRoutingModule
  ],
  declarations: [
    WorkspaceComponent,
    SalesConfirmationComponent,
    ClockInConfirmationComponent
  ],
  entryComponents: [
    SalesConfirmationComponent,
    ClockInConfirmationComponent
  ],
  providers: [
    ActiveProjectService
  ]
})
export class WorkspaceModule {}
