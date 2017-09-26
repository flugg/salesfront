import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/first';

import { TeamService } from '../../../../core/services/team.service';
import { ActiveProjectService } from '../../../active-project.service';

@Component({
  templateUrl: 'create-team.component.html',
  styleUrls: ['create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {
  loading = true;
  name: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private activeProject: ActiveProjectService,
              private teamService: TeamService) {}

  ngOnInit() {
    this.loading = false;
  }

  submit(name) {
    this.activeProject.project.first().subscribe(project => {
      this.teamService.create(project.id, name).then(() => {
        this.router.navigate(['..'], { relativeTo: this.route });
        this.snackBar.open('Team created', null, <MdSnackBarConfig>{ duration: 2000 });
      });
    });
  }
}
