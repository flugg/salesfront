import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { ActiveProjectService } from '../../core/active-project.service';
import { TeamService } from './team.service';

@Component({
  selector: 'vmo-teams',
  templateUrl: 'teams.component.html'
})
export class TeamsComponent implements OnInit, OnDestroy {

  /**
   * Wether or not the component is currently loading.
   */
  isLoading = true;

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * The cursor for the paginated users.
   */
  cursor = new BehaviorSubject(15);

  /**
   * List of loaded teams.
   */
  teams: any[];

  /**
   * Constructs the component.
   */
  constructor(private teamSearvice: TeamService,
              private activeProject: ActiveProjectService) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.teamSearvice.getWithUpdates(this.activeProject.get(), this.cursor).subscribe(teams => {
      this.teams = teams;
      this.isLoading = false;
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
