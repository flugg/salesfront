import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Team } from '../../shared/team.model';
import { SelectedTeamService } from '../team-profile/selected-team.service';
import { TeamService } from '../../shared/team.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  templateUrl: 'edit-team.component.html',
  styleUrls: ['edit-team.component.scss']
})
export class EditTeamComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * The selected team.
   */
  team: Team;

  /**
   * The name input value.
   */
  name: string;

  /**
   * List of observable subscriptions.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private selectedTeam: SelectedTeamService,
              private teamService: TeamService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.selectedTeam.team.subscribe(team => {
      this.team = team;
      this.name = this.team.name;
      this.loading = false;
    });
  }

  /**
   * Destroys the component.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Submits the form.
   */
  submit(name: string): void {
    this.teamService.update(this.team.id, { name }).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
      this.snackBar.open('Team updated', null, <MdSnackBarConfig>{ duration: 2000 });
    });
  }
}
