import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Team } from '../../../../core/models/team.model';
import { SelectedTeamService } from '../team-profile/selected-team.service';
import { TeamService } from '../../../../core/services/team.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  templateUrl: 'edit-team.component.html',
  styleUrls: ['edit-team.component.scss']
})
export class EditTeamComponent implements OnInit, OnDestroy {
  loading = true;
  team: Team;
  name: string;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private selectedTeam: SelectedTeamService,
              private teamService: TeamService) {}

  ngOnInit() {
    this.selectedTeam.team.subscribe(team => {
      this.team = team;
      this.name = this.team.name;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  submit(name: string): void {
    this.teamService.update(this.team.id, { name }).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
      this.snackBar.open('Team updated', null, <MdSnackBarConfig>{ duration: 2000 });
    });
  }
}
