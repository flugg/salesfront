import { Component, Inject, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

import { SalesBarComponent } from '../sales-bar.component';

@Component({
  templateUrl: 'contract-dialog.component.html',
  styleUrls: ['contract-dialog.component.scss']
})
export class ContractDialogComponent implements OnInit {
  pending = false;
  fields: any[];
  signature = '';

  onRegister = new EventEmitter();

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<SalesBarComponent>) {}

  ngOnInit(): void {
    this.fields = this.data.project.contractTemplate.fields.map(field => {
      return { name: field.name, value: '' };
    });
  }

  register(): void {
    this.pending = true;

    this.dialog.close();
    this.onRegister.emit({
      value: this.data.value,
      contract: this.fields.reduce((previous, item) => {
        return { ...previous, [item.name]: item.value };
      }, {}),
      signature: this.signature.length ? this.signature : null
    });
  }

  drawComplete() {
    this.signature = this.signaturePad.toDataURL();
  }

  clearSignature() {
    this.signature = '';
    this.signaturePad.clear();
  }
}
