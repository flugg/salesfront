import { Component, OnInit } from '@angular/core';

import { Member } from '../../../../../core/models/member.model';
import { ActiveMembershipService } from '../../../../active-membership.service';
import { MemberListService } from './member-list/member-list.service';
import { SelectedBudgetService } from './selected-budget.service';
import { TeamListService } from './team-list/team-list.service';

@Component({
  templateUrl: 'budget-tabs.component.html',
  providers: [SelectedBudgetService, MemberListService, TeamListService]
})
export class BudgetTabsComponent implements OnInit {
  membership: Member;

  constructor(private activeMembershipServicd: ActiveMembershipService) {}

  ngOnInit() {
    this.activeMembershipServicd.membership.subscribe(membership => {
      this.membership = membership;
    });
  }
}
