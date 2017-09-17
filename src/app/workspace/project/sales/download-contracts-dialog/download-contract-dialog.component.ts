import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { saveAs as saveFileAs } from 'file-saver';
import * as moment from 'moment';

import { ScreenService } from '../../../../core/screen.service';
import { ReportService } from '../../../../core/services/report.service';
import { WorkspaceComponent } from '../../../workspace.component';

@Component({
  templateUrl: 'download-contract-dialog.component.html'
})
export class DownloadContractDialogComponent implements OnInit {
  after: Date;
  before: Date;
  mobile: boolean;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<WorkspaceComponent>,
              private screenService: ScreenService,
              private reportService: ReportService) {}

  ngOnInit(): void {
    this.after = moment().startOf('month').toDate();
    this.before = moment().toDate();

    this.screenService.asObservable().subscribe(breakpoint => {
      this.mobile = breakpoint === 'xs' || breakpoint === 'sm';
    });
  }

  download() {
    this.reportService.download(moment(this.after), moment(this.before)).subscribe(blob => saveFileAs(blob, 'lol'));
  }
}
