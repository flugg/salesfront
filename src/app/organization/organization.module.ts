import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationSharedModule } from './shared/organization-shared.module';
import { ActiveProjectService } from './active-project.service';
import { UnsetProjectResolver } from './project-list/unset-project-resolver.service';
import { CreateProjectComponent } from './create-project/create-project.component';
import { OrganizationComponent } from './organization.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ClockInDialogComponent } from './sidenav/clock-in-dialog/clock-in-dialog.component';
import { SessionBarComponent } from './sidenav/session-bar/session-bar.component';
import { SalesBarComponent } from './sales-bar/sales-bar.component';
import { AddSaleDialogComponent } from './sales-bar/add-sale-dialog/add-sale-dialog.component';
import { ContractDialogComponent } from './sales-bar/contract-dialog/contract-dialog.component';
import { SaleAddedDialogComponent } from './sales-bar/sale-added-dialog/sale-added-dialog.component';
import { FilteredTeamsPipe } from './project-list/filtered-teams.pipe';
import { CloseSidenavResolver } from './close-sidenav-resolver.service';
import { SidenavService } from './sidenav.service';
import { EditProjectComponent } from './edit-project/edit-project.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
    OrganizationRoutingModule
  ],
  providers: [
    SidenavService,
    ActiveProjectService,
    UnsetProjectResolver,
    CloseSidenavResolver
  ],
  declarations: [
    OrganizationComponent,
    ProjectListComponent,
    CreateProjectComponent,
    EditProjectComponent,
    SidenavComponent,
    ClockInDialogComponent,
    SessionBarComponent,
    SalesBarComponent,
    AddSaleDialogComponent,
    ContractDialogComponent,
    SaleAddedDialogComponent,
    FilteredTeamsPipe
  ],
  entryComponents: [
    CreateProjectComponent,
    EditProjectComponent,
    ClockInDialogComponent,
    AddSaleDialogComponent,
    ContractDialogComponent,
    SaleAddedDialogComponent
  ]
})
export class OrganizationModule {}
