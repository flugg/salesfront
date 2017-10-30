import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../../../../core/models/member.model';

import { Organization } from '../../../../core/models/organization.model';
import { OrganizationService } from '../../../../core/services/organization.service';
import { ActiveMembershipService } from '../../../active-membership.service';

@Component({
  templateUrl: 'organization.component.html'
})
export class OrganizationComponent implements OnInit {
  loading = true;
  organization: Organization;
  membership: Member;
  name: string;
  slug: string;
  url: string;
  base64: string;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private activeMembershipService: ActiveMembershipService,
              private organizationService: OrganizationService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.activeMembershipService.membership.subscribe(membership => {
      this.organization = membership.organization;
      this.membership = membership;
      this.name = this.organization.name;
      this.slug = this.organization.slug;
      this.changeDetectorRef.detectChanges();
      this.loading = false;
    });
  }

  submit(): void {
    const attributes = {
      name: this.name,
      slug: this.slug
    }

    if (this.base64) {
      attributes['logo'] = this.base64;
    }

    this.organizationService.update(this.organization.id, attributes).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
      this.snackBar.open('Organization updated', null, <MdSnackBarConfig>{ duration: 2000 });
    });
  }

  reset(): void {
    this.url = undefined;
  }

  fileChangeListener(changeEvent) {
    if (changeEvent.target.files && changeEvent.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.onloadend = () => {
        this.base64 = reader.result;
      }

      reader.readAsDataURL(changeEvent.target.files[0]);
    }
  }
}
