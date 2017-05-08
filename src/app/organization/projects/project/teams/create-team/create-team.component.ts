import { Component } from '@angular/core';
import 'rxjs/add/operator/first';

import { ActiveProjectService } from '../../../../../core/active-project.service';
import { TeamService } from '../team.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent {

  /**
   * Constructs the component.
   */
  constructor(private router: Router,
              private activeProject: ActiveProjectService,
              private teamService: TeamService) {}

  /**
   * Submits the form.
   */
  submit(name) {
    this.activeProject.project.first().subscribe(project => {
      this.teamService.create(project.id, name).then(team => {
        this.router.navigate(['projects', project.id, 'teams', team.id]);
      });
    });
  }
}
