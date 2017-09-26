import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/first';

import { ContractTemplate } from '../../../../../core/models/contract-template.model';
import { ContractTemplateService } from '../../../../../core/services/contract-template.service';
import { SelectedTemplateService } from './selected-template.service';

@Component({
  templateUrl: 'edit-template.component.html',
  providers: [SelectedTemplateService]
})
export class EditTemplateComponent implements OnInit {
  loading = true;
  template: ContractTemplate;
  signature = false;
  name: string;
  fields = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private contractTemplateService: ContractTemplateService,
              private selectedTemplateService: SelectedTemplateService) {}

  ngOnInit() {
    this.selectedTemplateService.template.subscribe(template => {
      this.template = template;
      this.name = this.template.name;
      this.signature = this.template.signature;
      this.fields = [...this.template.fields];
      this.loading = false;
    });
  }

  submit() {
    this.contractTemplateService.update(this.template.id, this.name, this.getFieldNames(), this.signature).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
      this.snackBar.open('Contract updated', null, <MdSnackBarConfig>{ duration: 2000 });
    });
  }

  addField() {
    this.fields.push({ name: '' });
  }

  removeField(index: number) {
    this.fields.splice(index, 1);
  }

  getFieldNames() {
    return this.fields.map(field => field.name).filter(name => name.length > 0);
  }
}
