import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/first';

import { Member } from '../../../../../../core/models/member.model';
import { ContractTemplateService } from '../../../../../../core/services/contract-template.service';
import { ActiveMembershipService } from '../../../../../../organization/active-membership.service';

@Component({
  templateUrl: 'create-template.component.html'
})
export class CreateTemplateComponent implements OnInit {
  loading = true;
  membership: Member;
  signature = false;
  name: string;
  fields = [
    { name: '' },
    { name: '' }
  ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private contractTemplateService: ContractTemplateService,
              private activeMembershipService: ActiveMembershipService) {}

  ngOnInit() {
    this.activeMembershipService.membership.subscribe(membership => {
      this.membership = membership;
      this.loading = false;
    });
  }

  submit() {
    this.contractTemplateService.register(this.membership.organizationId, this.name, this.getFieldNames(), this.signature).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
      this.snackBar.open('Contract created', null, <MdSnackBarConfig>{ duration: 2000 });
    });
  }

  addField() {
    this.fields = [...this.fields, { name: '' }];
  }

  removeField(index: number) {
    this.fields.splice(index, 1);
  }

  getFieldNames() {
    return this.fields.map(field => field.name).filter(name => name.length > 0);
  }
}
