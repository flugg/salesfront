import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../../../shared/user.service';
import { User } from '../../../../shared/user.model';
import { TeamService } from '../../shared/team.service';
import { ActiveMembershipService } from '../../../active-membership.service';
import { Team } from '../../shared/team.model';
import { MembershipService } from '../../../../shared/membership.service';
import { Membership } from '../../../../shared/membership.model';

@Component({
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.scss'],
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
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private route: ActivatedRoute,
              private membershipService: MembershipService,
              private teamService: TeamService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.membershipService.find(this.route.snapshot.params.member).subscribe(membership => {
      if (membership.teamId) {
        this.subscriptions.push(this.teamService.find(membership.teamId).subscribe(team => {
          this.membership = membership;
          this.team = team;
          this.loading = false;
        }));
      } else {
        this.membership = membership;
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
}
