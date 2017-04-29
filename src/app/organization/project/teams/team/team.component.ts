import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { TeamService } from '../team.service';
import { Team } from '../../shared/team.model';

@Component({
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit, OnDestroy {

  /**
   * Weather or not the component is currently loading.
   */
  isLoading = true;

  /**
   * The team being shown
   */
  team: Team;

  /**
   * List of all observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private route: ActivatedRoute,
              private teamService: TeamService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.teamService.find(this.route.snapshot.url[0].path).subscribe(team => {
      this.team = team;
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
