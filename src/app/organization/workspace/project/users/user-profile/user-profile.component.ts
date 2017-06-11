import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../../../shared/user.service';
import { User } from '../../../../shared/user.model';
import { TeamService } from '../../shared/team.service';
import { ActiveMembershipService } from '../../../active-membership.service';
import { Team } from '../../shared/team.model';

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
   * The selected user.
   */
  user: User;

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
              private activeMembership: ActiveMembershipService,
              private userService: UserService,
              private teamService: TeamService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.userService.find(this.route.snapshot.params.member).subscribe(user => {
      this.subscriptions.push(this.activeMembership.membership.subscribe(membership => {
        this.subscriptions.push(this.teamService.find(membership.teamId).subscribe(team => {
          this.user = user;
          this.team = team;
          this.loading = false;
        }));
      }));
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
