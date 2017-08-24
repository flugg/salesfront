import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceSharedModule } from './shared/workspace-shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavItemComponent } from './sidenav/nav-item/nav-item.component';
import { SessionBarComponent } from './sidenav/session-bar/session-bar.component';
import { ClockInDialogComponent } from './sidenav/clock-in-dialog/clock-in-dialog.component';
import { SaleAddedDialogComponent } from './sales-bar/sale-added-dialog/sale-added-dialog.component';
import { SalesBarComponent } from './sales-bar/sales-bar.component';
import { ActiveProjectService } from './active-project.service';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    WorkspaceRoutingModule
  ],
  declarations: [
    WorkspaceComponent,
    SidenavComponent,
    NavItemComponent,
    SessionBarComponent,
    ClockInDialogComponent,
    SalesBarComponent,
    SaleAddedDialogComponent
  ],
  entryComponents: [
    SaleAddedDialogComponent,
    ClockInDialogComponent
  ],
  providers: [
    ActiveProjectService
  ]
})
export class WorkspaceModule {
}