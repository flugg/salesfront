import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { TeamService } from '../../shared/team.service';
import { Team } from '../../shared/team.model';
import { MembershipService } from '../../../../shared/membership.service';
import { Membership } from '../../../../shared/membership.model';
import { ActiveUserService } from '../../../../active-user.service';
import { User } from '../../../../shared/user.model';
import { ActiveMembershipService } from '../../../active-membership.service';

@Component({
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
  constructor(private route: ActivatedRoute,
              private activeMembership: ActiveMembershipService,
              private membershipService: MembershipService,
              private teamService: TeamService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.activeMembership.membership.subscribe(member => {
      this.activeMember = member;
      this.subscriptions.push(this.membershipService.find(this.route.snapshot.params['member']).subscribe(membership => {
        if (membership.teamMembers && membership.teamMembers.length) {
          this.subscriptions.push(this.teamService.find(membership.teamMembers[0].teamId).subscribe(team => {
            this.membership = membership;
            this.team = team;
            this.role = this.getRole();
            this.canEdit = this.checkIfCanEdit();
            this.loading = false;
          }));
        } else {
          this.membership = membership;
          this.role = this.getRole();
          this.canEdit = this.checkIfCanEdit();
          this.loading = false;
        }
      }));
    });
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
   * Gets the role of the user.
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
