import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { OrganizationSharedModule } from '../../shared/organization-shared.module';
import { WallOfFameRoutingModule } from './wall-of-fame-routing.module';
import { DailyTeamAwardListComponent } from './wall-of-fame-tabs/team-list/daily-team-awards/daily-team-award-list.component';
import { TeamListComponent } from './wall-of-fame-tabs/team-list/team-list.component';
import { DailyAwardListComponent } from './wall-of-fame-tabs/user-list/daily-awards/daily-award-list.component';
import { UserListComponent } from './wall-of-fame-tabs/user-list/user-list.component';
import { WallOfFameTabsComponent } from './wall-of-fame-tabs/wall-of-fame-tabs.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
    WallOfFameRoutingModule
  ],
  declarations: [
    WallOfFameTabsComponent,
    TeamListComponent,
    UserListComponent,
    DailyAwardListComponent,
    DailyTeamAwardListComponent
  ]
})
export class WallOfFameModule {}
