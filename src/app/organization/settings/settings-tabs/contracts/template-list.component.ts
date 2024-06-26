import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ContractTemplate } from '../../../../core/models/contract-template.model';
import { TemplateListService } from './template-list.service';

@Component({
  templateUrl: 'template-list.component.html',
  providers: [TemplateListService]
})
export class TemplateListComponent implements OnInit {
  loading = true;
  templates: ContractTemplate[] = [];
  name: string;

  constructor(public templateListService: TemplateListService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.templateListService.templates.subscribe(templates => {
      this.templates = templates;
      this.changeDetectorRef.detectChanges();
      this.loading = false;
    });
  }
}
