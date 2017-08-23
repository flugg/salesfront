import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { DatepickerService } from '../../shared/datepicker/datepicker.service';
import { TeamListService } from './team-list.service';
import { ActiveProjectService } from '../../../../active-project.service';
import { Project } from '../../../../../core/models/project.model';
import { Team } from '../../../../../core/models/team.model';

@Component({
  templateUrl: 'team-list.component.html'
})
export class TeamListComponent implements OnInit, OnDestroy {
  loading = true;
  countComplete = false;
  project: Project;
  teams: Team[];
  total: number;

  private subscriptions: Subscription[] = [];

  constructor(public datepicker: DatepickerService,
              private activeProjectService: ActiveProjectService,
              private teamListService: TeamListService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeProjectService.project,
      this.teamListService.teams
    ).subscribe(data => {
      [this.project, this.teams] = data;
      this.total = this.calculateTotal(this.teams);
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private calculateTotal(teams: Team[]): number {
    return teams.reduce((value, team) => value + team.value, 0);
  }
}
