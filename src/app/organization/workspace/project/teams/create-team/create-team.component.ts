import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import 'rxjs/add/operator/first';

import { ActiveProjectService } from '../../../shared/active-project.service';
import { TeamService } from '../../shared/team.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'create-team.component.html',
  styleUrls: ['create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  /**
   * The name input value.
   */
  name: string;

  /**
   * Indicates if the component is currently loading.
   */
  loading = true;

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private snackBar: MdSnackBar,
              private activeProject: ActiveProjectService,
              private teamService: TeamService) {}

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.loading = false;
  }

  /**
   * Submits the form.
   */
  submit(name) {
    this.activeProject.project.first().subscribe(project => {
      this.teamService.create(project.id, name).then(team => {
        this.router.navigate(['projects', project.id, 'teams', team.id]);
        this.snackBar.open('Team created', null, <MdSnackBarConfig>{ duration: 2000 });
      });
    });
  }
}
