import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { AppComponent } from '../../app.component';

@Component({
  templateUrl: './sales-dialog.component.html',
  styleUrls: ['./sales-dialog.component.scss']
})
export class SalesDialogComponent implements OnInit {

  /**
   * Constructs the component.
   */
  constructor(private dialog: MdDialogRef<AppComponent>) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {}
}
