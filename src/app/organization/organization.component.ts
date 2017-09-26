import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Member } from '../core/models/member.model';
import { Project } from '../core/models/project.model';
import { ActiveMembershipService } from './active-membership.service';
import { ActiveProjectService } from './active-project.service';
import { SidenavService } from './sidenav.service';

@Component({
  templateUrl: 'organization.component.html',
  styleUrls: ['organization.component.scss'],
  providers: [ActiveMembershipService, SidenavService]
})
export class OrganizationComponent implements OnInit, OnDestroy {
  loading = true;
  membership: Member;
  project: Project;

  private subscriptions: Subscription[] = [];

  @ViewChild('sidenav') private sidenav: MdSidenav;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private sidenavService: SidenavService,
              private activeMembershipService: ActiveMembershipService,
              private activeProjectService: ActiveProjectService) {}

  ngOnInit(): void {
    this.sidenavService.set(this.sidenav);

    this.subscriptions.push(Observable.combineLatest(
      this.activeMembershipService.membership,
      this.activeProjectService.project
    ).subscribe(data => {
      [this.membership, this.project] = data;

      if (this.membership.deletedAt) {
        this.router.navigate(['..'], { relativeTo: this.route });
      }

      this.loading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
