import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { TeamListService } from './team-list.service';
import { Team } from '../../../shared/team.model';
import { DatepickerService } from '../../shared/datepicker/datepicker.service';

@Component({
  templateUrl: 'team-list.component.html',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'scaleX(0)' }),
        animate('800ms ease-in-out', style({ transform: 'scaleX(1)' }))
      ])
    ])
  ]
})
export class TeamListComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * List of teams sale stats
   */
  teams: Team[];

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
              private teamList: TeamListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.teamList.teams.subscribe(teams => {
      this.teams = teams;
      this.total = this.calculateTotal(teams);
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

  /**
   * Calculates the total from a list of teams.
   */
  private calculateTotal(teams: Team[]): number {
    return teams.reduce((value, team) => value + team.sales.length, 0);
  }
}
