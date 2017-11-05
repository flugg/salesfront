import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActiveUserService } from './active-user.service';
import { Organization } from '../core/models/organization.model';
import { User } from '../core/models/user.model';
import { Member } from '../core/models/member.model';

@Component({
  templateUrl: 'organization-list.component.html',
  styleUrls: ['organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  loading = true;
  user: User | null;
  memberships: Member[];
  organizations: Organization[] | null;
  basePath = 'https://s3.eu-central-1.amazonaws.com/vendumo/';

  constructor(private router: Router,
              private activeUserService: ActiveUserService) {}

  ngOnInit() {
    this.activeUserService.user.subscribe(user => {
      this.user = user;
      this.memberships = this.user.memberships.filter(membership => ! membership.deletedAt);

      if (this.router.isActive('/', true) && this.memberships.length === 1) {
        this.router.navigate([this.memberships[0].organization.slug]);
      }

      this.loading = false;
    });
  }
}
