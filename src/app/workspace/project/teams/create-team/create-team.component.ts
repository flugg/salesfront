import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import 'rxjs/add/operator/first';

import { ActiveProjectService } from '../../../active-project.service';
import { TeamService } from '../../../../core/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';

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
      this.teamService.create(project.id, name).then(team => {
        this.router.navigate(['..'], { relativeTo: this.route });
        this.snackBar.open('Team created', null, <MdSnackBarConfig>{ duration: 2000 });
      });
    });
  }
}
