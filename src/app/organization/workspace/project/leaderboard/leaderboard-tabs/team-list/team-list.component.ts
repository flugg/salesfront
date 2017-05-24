import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { TeamListService } from './team-list.service';
import { Team } from '../../../shared/team.model';

@Component({
  providers: [TeamListService],
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
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private teamList: TeamListService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.teamList.teams.subscribe(teams => {
      this.teams = teams;
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
