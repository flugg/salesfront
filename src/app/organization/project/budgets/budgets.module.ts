import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { OrganizationSharedModule } from '../../shared/organization-shared.module';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetsRoutingModule } from './budgets-routing.module';
import { DistributeBudgetDialogComponent } from './distribute-budget-dialog/distribute-budget-dialog.component';
import { DailyBudgetListComponent } from './budget-list/daily-budgets/daily-budget-list.component';
import { MonthlyBudgetListComponent } from './budget-list/monthly-budgets/monthly-budget-list.component';
import { CustomBudgetListComponent } from './budget-list/custom-budgets/custom-budget-list.component';
import { BudgetTabsComponent } from './budget-list/budget/budget-tabs.component';
import { TeamListComponent } from './budget-list/budget/team-list/team-list.component';
import { MemberListComponent } from './budget-list/budget/member-list/member-list.component';
import { TeamComponent } from './budget-list/budget/team-list/team/team.component';
import { EditBudgetComponent } from './budget-list/budget/edit-budget/edit-budget.component';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
    BudgetsRoutingModule
  ],
  declarations: [
    BudgetListComponent,
    AddBudgetComponent,
    DistributeBudgetDialogComponent,
    DailyBudgetListComponent,
    MonthlyBudgetListComponent,
    CustomBudgetListComponent,
    BudgetTabsComponent,
    MemberListComponent,
    TeamListComponent,
    TeamComponent,
    EditBudgetComponent
  ],
  entryComponents: [
    DistributeBudgetDialogComponent
  ]
})
export class BudgetsModule {}
