import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddBudgetComponent } from './add-budget/add-budget.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetTabsComponent } from './budget-list/budget/budget-tabs.component';
import { MemberListComponent } from './budget-list/budget/member-list/member-list.component';
import { TeamListComponent } from './budget-list/budget/team-list/team-list.component';
import { TeamComponent } from './budget-list/budget/team-list/team/team.component';
import { CustomBudgetListComponent } from './budget-list/custom-budgets/custom-budget-list.component';
import { DailyBudgetListComponent } from './budget-list/daily-budgets/daily-budget-list.component';
import { MonthlyBudgetListComponent } from './budget-list/monthly-budgets/monthly-budget-list.component';
import { EditBudgetComponent } from './budget-list/budget/edit-budget/edit-budget.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetListComponent,
    children: [
      {
        path: 'new',
        component: AddBudgetComponent
      },
      {
        path: 'daily',
        component: DailyBudgetListComponent
      },
      {
        path: 'monthly',
        component: MonthlyBudgetListComponent
      },
      {
        path: 'custom',
        component: CustomBudgetListComponent
      },
      {
        path: ':type',
        children: [
          {
            path: ':budget',
            component: BudgetTabsComponent,
            children: [
              {
                path: 'edit',
                component: EditBudgetComponent
              },
              {
                path: '',
                component: BudgetTabsComponent,
                children: [
                  {
                    path: '',
                    redirectTo: 'members',
                    pathMatch: 'full'
                  },
                  {
                    path: 'members',
                    component: MemberListComponent
                  },
                  {
                    path: 'teams',
                    component: TeamListComponent,
                    children: [
                      {
                        path: ':team',
                        component: TeamComponent
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetsRoutingModule {}
