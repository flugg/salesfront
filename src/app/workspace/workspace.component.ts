import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { SidenavService } from './sidenav.service';
import { ActiveUserService } from '../organization-list/active-user.service';
import { ActiveMembershipService } from '../organization/active-membership.service';
import { ActiveProjectService } from './active-project.service';
import { Project } from '../core/models/project.model';
import { User } from '../core/models/user.model';
import { Member } from '../core/models/member.model';

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

  constructor(private sidenavService: SidenavService,
              private activeUserService: ActiveUserService,
              private activeMembershipService: ActiveMembershipService,
              private activeProjectService: ActiveProjectService) {}

  ngOnInit() {
    this.sidenavService.set(this.sidenav);

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
  }
}
