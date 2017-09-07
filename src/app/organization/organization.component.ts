import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { ActiveMembershipService } from './active-membership.service';
import { ProjectListService } from './project2-list.service';
import { Member } from '../core/models/member.model';
import { Project } from '../core/models/project.model';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: 'organization.component.html',
  styleUrls: ['organization.component.scss'],
  providers: [ActiveMembershipService, ProjectListService]
})
export class OrganizationComponent implements OnInit {
  loading = true;
  membership: Member;
  projects: Project[];

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialog: MdDialog,
              private activeMembershipService: ActiveMembershipService,
              private projectListService: ProjectListService) {}

  ngOnInit(): void {
    this.subscriptions.push(Observable.combineLatest(
      this.activeMembershipService.membership,
      this.projectListService.projects
    ).subscribe(data => {
      [this.membership, this.projects] = data;

      if (this.membership.deletedAt) {
        this.router.navigate(['..'], { relativeTo: this.route });
      }

      this.loading = false;
    }));
  }

  openCreateProjectDialog(): void {
    this.dialog.open(CreateProjectComponent, <MdDialogConfig>{
      panelClass: 'create-project-dialog',
      data: {
        organizationId: this.membership.organizationId
      }
    });
  }
}
