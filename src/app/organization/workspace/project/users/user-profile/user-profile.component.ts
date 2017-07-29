import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { TeamService } from '../../shared/team.service';
import { Team } from '../../shared/team.model';
import { Membership } from '../../../../shared/membership.model';
import { ActiveMembershipService } from '../../../active-membership.service';
import { SelectedMembershipService } from './selected-membership.service';
import { TopDailySellersListService } from './top-daily-sellers-list.service';
import { TopDailySeller } from '../../wall-of-fame/shared/top-daily-seller.model';

@Component({
  providers: [SelectedMembershipService, TopDailySellersListService],
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
   * A list of the member's top daily awards.
   */
  topDailySellers: TopDailySeller[];

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
              private topDailySellersList: TopDailySellersListService,
              private teamService: TeamService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.selectedMembership.membership,
      this.activeMembership.membership,
      this.topDailySellersList.sellers
    ).subscribe(data => {
      [this.membership, this.activeMember, this.topDailySellers] = data;
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
