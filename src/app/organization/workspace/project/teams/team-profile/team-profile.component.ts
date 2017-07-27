import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { SelectedTeamService } from './selected-team.service';
import { LeaderListService } from './leader-list/leader-list.service';
import { MemberListService } from '../shared/member-list.service';
import { ActiveMembershipService } from '../../../active-membership.service';
import { Team } from '../../shared/team.model';
import { Membership } from '../../../../shared/membership.model';

@Component({
  providers: [SelectedTeamService, LeaderListService, MemberListService],
  templateUrl: 'team-profile.component.html'
})
export class TeamProfileComponent implements OnInit {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The selected team-profile.
   */
  team: Team;

  /**
   * The logged in membership.
   */
  membership: Membership;

  /**
   * Flag indicating wether or not the logged in user can edit the selected team.
   */
  canEdit: boolean;

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private selectedTeam: SelectedTeamService,
              private activeMembership: ActiveMembershipService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.selectedTeam.team,
      this.activeMembership.membership
    ).subscribe(data => {
      [this.team, this.membership] = data;
      this.canEdit = this.checkIfCanEdit();
      this.loading = false;
    }));
  }

  /**
   * Check if user can edit team.
   */
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
