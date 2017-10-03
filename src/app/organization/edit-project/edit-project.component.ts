import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { ProjectService } from '../../core/services/project.service';
import { ProjectListComponent } from '../project-list/project-list.component';

@Component({
  templateUrl: 'edit-project.component.html',
  styleUrls: ['edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  loading = true;
  name: string;
  color: string;
  withContract: boolean;
  selectedContract: string;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<ProjectListComponent>,
              private snackBar: MdSnackBar,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.name = this.data.project.name;
    this.color = this.data.project.color;
    this.withContract = this.data.project.contractTemplateId !== null;
    this.selectedContract = this.data.project.contractTemplateId;
    this.loading = false;
  }

  submit() {
    let attributes = {
      name: this.name,
      color: this.color
    };

    if (this.withContract) {
      attributes = Object.assign(attributes, { contract: this.selectedContract });
    }

    this.projectService.update(this.data.project.id, attributes).then(() => {
      this.dialog.close();
      this.snackBar.open('Project updated', null, <MdSnackBarConfig>{ duration: 2000 });
    });
  }
}
