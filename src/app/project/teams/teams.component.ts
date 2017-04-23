import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs';
import { TeamService } from './team.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'vmo-teams',
  templateUrl: 'teams.component.html'
})
export class TeamsComponent implements OnInit {

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
              private projectService: ProjectService) {
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.subscriptions.push(this.teamSearvice.getWithUpdates(this.projectService.savedProject(), this.cursor).subscribe(teams => {
      this.teams = teams;
      this.isLoading = false;
    }));
  }
}
