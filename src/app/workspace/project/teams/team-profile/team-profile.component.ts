import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { SelectedTeamService } from './selected-team.service';
import { MemberListService } from '../shared/member-list.service';
import { ActiveMembershipService } from '../../../../organization/active-membership.service';
import { Team } from '../../../../core/models/team.model';
import { Member } from '../../../../core/models/member.model';

@Component({
  providers: [SelectedTeamService, MemberListService],
  templateUrl: 'team-profile.component.html'
})
export class TeamProfileComponent implements OnInit {
  loading = true;
  team: Team;
  membership: Member;
  canEdit: boolean;

  private subscriptions: Subscription[] = [];

  constructor(private activeMembershipService: ActiveMembershipService,
              private selectedTeamService: SelectedTeamService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.selectedTeamService.team,
      this.activeMembershipService.membership
    ).subscribe(data => {
      [this.team, this.membership] = data;
      this.canEdit = this.checkIfCanEdit();
      this.loading = false;
    }));
  }

  private checkIfCanEdit(): boolean {
    if (this.membership.user.isAdmin) {
      return true;
    }

    for (const member of this.membership.teamMembers) {
      if (member.teamId === this.team.id && member.isLeader) {
        return true;
      }
    }

    return false;
  }
}
