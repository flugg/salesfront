import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AddSaleDialogComponent } from '../organization/sales-bar/add-sale-dialog/add-sale-dialog.component';
import { ContractDialogComponent } from '../organization/sales-bar/contract-dialog/contract-dialog.component';
import { SaleAddedDialogComponent } from '../organization/sales-bar/sale-added-dialog/sale-added-dialog.component';
import { SalesBarComponent } from '../organization/sales-bar/sales-bar.component';
import { ClockInDialogComponent } from '../organization/sidenav/clock-in-dialog/clock-in-dialog.component';
import { SessionBarComponent } from '../organization/sidenav/session-bar/session-bar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceRoutingModule
  ],
  declarations: [
    WorkspaceComponent,
    SidenavComponent,
    SessionBarComponent,
    SalesBarComponent,
    AddSaleDialogComponent,
    SaleAddedDialogComponent,
    ClockInDialogComponent,
    ContractDialogComponent
  ],
  entryComponents: [
    AddSaleDialogComponent,
    SaleAddedDialogComponent,
    ClockInDialogComponent,
    ContractDialogComponent
  ]
})
export class WorkspaceModule {}
