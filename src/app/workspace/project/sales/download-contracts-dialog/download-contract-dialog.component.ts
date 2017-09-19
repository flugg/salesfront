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
  pending = false;
  after: Date;
  before: Date;
  mobile: boolean;
  selectedFileType = 'xls';
  fileTypes: any[] = [
    { type: 'xls', label: 'Excel (xls)' },
    { type: 'xlsx', label: 'Excel (xlsx)' },
    { type: 'csv', label: 'CSV (csv)' },
    { type: 'pdf', label: 'PDF (pdf)' },
  ];

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
    this.pending = true;
    this.reportService.download(this.data.project.id, moment(this.after), moment(this.before), this.selectedFileType).subscribe(blob => {
      saveFileAs(blob, `${this.data.project.name}-${moment(this.after).format('YYYYMMDD')}-${moment(this.before).format('YYYYMMDD')}.${this.selectedFileType}`);
      this.dialog.close();
    });
  }
}
