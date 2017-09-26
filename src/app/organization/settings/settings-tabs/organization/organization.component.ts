import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Organization } from '../../../../core/models/organization.model';
import { OrganizationService } from '../../../../core/services/organization.service';
import { ActiveMembershipService } from '../../../active-membership.service';

@Component({
  templateUrl: 'organization.component.html'
})
export class OrganizationComponent implements OnInit {
  loading = true;
  organization: Organization;
  name: string;
  slug: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private activeMembershipService: ActiveMembershipService,
              private organizationService: OrganizationService) {}

  ngOnInit() {
    this.activeMembershipService.membership.subscribe(membership => {
      this.organization = membership.organization;
      this.name = this.organization.name;
      this.slug = this.organization.slug;
      this.loading = false;
    });
  }

  submit(): void {
    this.organizationService.update(this.organization.id, { name: this.name, slug: this.slug }).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
      this.snackBar.open('Organization updated', null, <MdSnackBarConfig>{ duration: 2000 });
    });
  }
}
