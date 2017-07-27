import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { Team } from '../../shared/team.model';
import { SelectedTeamService } from '../team-profile/selected-team.service';
import { MembershipListService } from './membership-list.service';
import { Membership } from '../../../../shared/membership.model';
import { TeamMemberService } from '../../../../shared/team-member.service';

@Component({
  providers: [MembershipListService],
  templateUrl: 'add-member.component.html'
})
export class AddMemberComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * List of loaded memberships.
   */
  memberships: Membership[];

  /**
   * The selected team.
   */
  team: Team;

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(public membershipList: MembershipListService,
              private snackBar: MdSnackBar,
              private router: Router,
              private selectedTeam: SelectedTeamService,
              private teamMemberService: TeamMemberService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.membershipList.memberships,
      this.selectedTeam.team
    ).subscribe(data => {
      [this.memberships, this.team] = data;
      this.loading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Adds a member to the selected team.
   */
  addMember(membership: Membership) {
    this.teamMemberService.add(membership, this.team).then(() => {
      this.snackBar.open(membership.user.name + ' added to team', null, <MdSnackBarConfig>{ duration: 2000 });
    });
  }
}
