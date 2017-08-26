import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { OrganizationComponent } from '../organization.component';
import { ProjectService } from '../../core/services/project.service';

@Component({
  templateUrl: 'create-project.component.html',
  styleUrls: ['create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  loading = true;
  name: string;
  color = 'pink';
  projectType = 'count';
  notation = '$';
  notationBefore = true;
  withDecimals = true;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<OrganizationComponent>,
              private snackBar: MdSnackBar,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.loading = false;
  }

  submit() {
    if (!this.name.length) {
      return false;
    }

    let attributes = {
      name: this.name,
      color: this.color,
      type: this.projectType
    };

    if (this.projectType === 'value') {
      attributes = Object.assign(attributes, {
        notation: this.notation,
        notationBefore: this.notationBefore,
        decimals: this.withDecimals ? 2 : 0
      });
    }

    this.projectService.create(this.data.organizationId, attributes).then(() => {
      this.dialog.close();
      this.snackBar.open('Project created', null, <MdSnackBarConfig>{ duration: 2000 });
    });
  }
}
