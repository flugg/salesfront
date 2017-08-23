import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActiveUserService } from './active-user.service';
import { Organization } from '../core/models/organization.model';
import { User } from '../core/models/user.model';

@Component({
  templateUrl: 'organization-list.component.html',
  styleUrls: ['organization-list.component.scss'],
  providers: [ActiveUserService]
})
export class OrganizationListComponent implements OnInit {
  loading = true;
  user: User | null;
  organizations: Organization[] | null;

  constructor(private router: Router,
              private activeUserService: ActiveUserService) {}

  ngOnInit() {
    this.activeUserService.user.subscribe(user => {
      if (this.router.isActive('/', true) && user.memberships.length === 1) {
        this.router.navigate([user.memberships[0].organizationId]);
      }

      this.user = user;
      this.loading = false;
    });
  }
}
