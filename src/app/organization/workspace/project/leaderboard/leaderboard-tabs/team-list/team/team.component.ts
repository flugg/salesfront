import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { SelectedTeamService } from './selected-team.service';
import { MemberListService } from './member-list.service';
import { Membership } from '../../../../../../shared/membership.model';
import { Team } from '../../../../shared/team.model';
import { DatepickerService } from '../../../shared/datepicker/datepicker.service';

@Component({
  providers: [SelectedTeamService, MemberListService],
  templateUrl: 'team.component.html',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'scaleX(0)' }),
        animate('800ms ease-in-out', style({ transform: 'scaleX(1)' }))
      ])
    ])
  ]
})
export class TeamComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The selected team.
   */
  team: Team;

  /**
   * The members of the selected team.
   */
  memberships: Membership[];

  /**
   * The total value.
   */
  total: number;

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(public datepicker: DatepickerService,
              private selectedTeam: SelectedTeamService,
              private memberList: MemberListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.selectedTeam.team,
      this.memberList.members
    ).subscribe(data => {
      [this.team, this.memberships] = data;
      this.total = this.memberships.reduce((value, membership) => value + membership.sales.length, 0);
      this.loading = false;
    }));
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
