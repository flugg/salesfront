import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { WorkspaceSharedModule } from '../../shared/workspace-shared.module';
import { WallOfFameRoutingModule } from './wall-of-fame-routing.module';
import { WallOfFameTabsComponent } from './wall-of-fame-tabs/wall-of-fame-tabs.component';
import { TeamListComponent } from './wall-of-fame-tabs/team-list/team-list.component';
import { UserListComponent } from './wall-of-fame-tabs/user-list/user-list.component';

@NgModule({
  imports: [
    SharedModule,
    WorkspaceSharedModule,
    WallOfFameRoutingModule
  ],
  declarations: [
    WallOfFameTabsComponent,
    TeamListComponent,
    UserListComponent
  ],
  providers: []
})
export class WallOfFameModule {
}
