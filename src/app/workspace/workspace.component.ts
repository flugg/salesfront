import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Member } from '../core/models/member.model';
import { Project } from '../core/models/project.model';
import { User } from '../core/models/user.model';
import { ActiveUserService } from '../organization-list/active-user.service';
import { ActiveMembershipService } from '../organization/active-membership.service';
import { ActiveProjectService } from '../organization/active-project.service';
import { SidenavService } from './sidenav.service';

@Component({
  templateUrl: 'workspace.component.html',
  styleUrls: ['workspace.component.scss'],
  providers: [SidenavService]
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  loading = true;
  activeUser: User | null;
  activeMembership: Member | null;
  activeProject: Project | null;

  private subscriptions: Subscription[] = [];
  @ViewChild('sidenav') private sidenav: MdSidenav;

  constructor(private activeUserService: ActiveUserService,
              private activeMembershipService: ActiveMembershipService,
              private activeProjectService: ActiveProjectService) {}

  ngOnInit() {
    this.subscriptions.push(Observable.combineLatest(
      this.activeUserService.user,
      this.activeMembershipService.membership,
      this.activeProjectService.project
    ).subscribe(data => {
      [this.activeUser, this.activeMembership, this.activeProject] = data;
      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.activeProjectService.unsetFromStorage();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
