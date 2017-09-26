import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { SalesListComponent } from '../sales-list/sales-list.component';

@Component({
  templateUrl: 'view-contract-dialog.component.html'
})
export class ViewContractDialogComponent implements OnInit {
  loading = true;
  contractFields = [];

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<SalesListComponent>) {}

  ngOnInit() {
    for (const field in this.data.contract.fields) {
      this.contractFields.push({
        name: field,
        value: this.data.contract.fields[field]
      });
    }
  }
}
