import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { TeamService } from '../../shared/team.service';
import { Team } from '../../shared/team.model';
import { MembershipService } from '../../../../shared/membership.service';
import { Membership } from '../../../../shared/membership.model';
import { ActiveMembershipService } from '../../../active-membership.service';
import { SelectedMembershipService } from './selected-membership.service';

@Component({
  providers: [SelectedMembershipService],
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The selected member.
   */
  membership: Membership;

  /**
   * The user's team.
   */
  team: Team;

  /**
   * The logged in member.
   */
  activeMember: Membership;

  /**
   * The role of the user.
   */
  role: string;

  /**
   * Flag indicating wether or not the logged in user can edit the selected member.
   */
  canEdit: boolean;

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private activeMembership: ActiveMembershipService,
              private selectedMembership: SelectedMembershipService,
              private teamService: TeamService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.selectedMembership.membership,
      this.activeMembership.membership
    ).subscribe(data => {
      [this.membership, this.activeMember] = data;
      if (this.membership.teamMembers && this.membership.teamMembers.length) {
        this.subscriptions.push(this.teamService.find(this.membership.teamMembers[0].teamId).subscribe(team => {
          this.team = team;
          this.role = this.getRole();
          this.canEdit = this.checkIfCanEdit();
          this.loading = false;
        }));
      } else {
        this.role = this.getRole();
        this.canEdit = this.checkIfCanEdit();
        this.loading = false;
      }
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Gets the role of the user.
   */
  private getRole(): string {
    if (this.membership.user.isAdmin) {
      return 'Administrator';
    }

    for (const teamMember of this.membership.teamMembers) {
      if (teamMember.isLeader) {
        return 'Team Leader';
      }
    }

    return 'Seller';
  }

  /**
   * Check if user can edit member.
   */
  private checkIfCanEdit(): boolean {
    if (this.activeMember.user.isAdmin) {
      return true;
    }

    if (this.activeMember.userId === this.membership.userId) {
      return true;
    }

    return false;
  }
}
