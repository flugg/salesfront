import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MdDialogConfig, MdDialog } from '@angular/material';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Member } from '../../core/models/member.model';
import { Project } from '../../core/models/project.model';
import { ScreenService } from '../../core/screen.service';
import { ActiveMembershipService } from '../active-membership.service';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { ProjectListService } from '../project-list.service';
import { DatepickerService } from '../shared/datepicker/datepicker.service';
import { ContractTemplateListService } from './contract-template-list.service';
import { ContractTemplate } from '../../core/models/contract-template.model';
import { EditProjectComponent } from '../edit-project/edit-project.component';

@Component({
  templateUrl: 'project-list.component.html',
  styleUrls: ['project-list.component.scss'],
  providers: [ProjectListService, ContractTemplateListService]
})
export class ProjectListComponent implements OnInit, OnDestroy {
  loading = true;
  membership: Member;
  projects: Project[];
  templates: ContractTemplate[];
  columns = 3;
  gutter = 24;
  current = 0;
  countComplete = [];

  private subscriptions: Subscription[] = [];

  constructor(public datepicker: DatepickerService,
              private dialog: MdDialog,
              private screenService: ScreenService,
              private activeMembershipService: ActiveMembershipService,
              private projectListService: ProjectListService,
              private templateListService: ContractTemplateListService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscriptions.push(Observable.combineLatest(
      this.activeMembershipService.membership,
      this.projectListService.projects,
      this.templateListService.templates
    ).subscribe(data => {
      [this.membership, this.projects, this.templates] = data;
      this.changeDetectorRef.detectChanges();
      this.loading = false;
    }));

    this.subscriptions.push(this.screenService.asObservable().subscribe(breakpoint => {
      if (breakpoint === 'xs') {
        this.columns = 1;
        this.gutter = 12;
      } else if (breakpoint === 'sm' || breakpoint === 'md') {
        this.columns = 2;
      } else {
        this.columns = 3;
        this.gutter = 24;
      }
    }));
  }

  openCreateProjectDialog(): void {
    this.dialog.open(CreateProjectComponent, <MdDialogConfig>{
      panelClass: 'create-project-dialog',
      data: {
        organization: this.membership.organization,
        templates: this.templates
      }
    });
  }

  openEditProjectDialog(project: Project): void {
    this.dialog.open(EditProjectComponent, <MdDialogConfig>{
      panelClass: 'create-project-dialog',
      data: {
        project: project,
        organization: this.membership.organization,
        templates: this.templates
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
