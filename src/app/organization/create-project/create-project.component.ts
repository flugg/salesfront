import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ProductService } from '../../core/services/product.service';

import { ProjectService } from '../../core/services/project.service';
import { OrganizationComponent } from '../organization.component';

@Component({
  templateUrl: 'create-project.component.html',
  styleUrls: ['create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  loading = true;
  pending = false;
  name: string;
  color = 'pink';
  projectType = 'count';
  notation = '$';
  notationBefore = true;
  withDecimals = true;
  withContract = false;
  selectedContract: string;
  products = [
    { name: '', value: 0 },
    { name: '', value: 0 }
  ];

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialogRef<OrganizationComponent>,
              private snackBar: MdSnackBar,
              private productService: ProductService,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.loading = false;
  }

  submit() {
    this.pending = true;
    if (!this.name.length) {
      return false;
    }

    let attributes = {
      name: this.name,
      color: this.color,
      type: this.projectType
    };

    if (this.projectType !== 'count') {
      attributes = Object.assign(attributes, {
        notation: this.notation,
        notationBefore: this.notationBefore,
        decimals: this.withDecimals ? 2 : 0
      });
    }

    if (this.withContract) {
      attributes = Object.assign(attributes, { contract: this.selectedContract });
    }

    this.projectService.create(this.data.organization.id, attributes).then(project => {
      if (project.type === 'product') {
        const promises = [];
        this.products.forEach(product => {
          promises.push(this.productService.create(project.id, { name: product.name, value: product.value }));
        });
        Promise.all(promises).then(() => this.closeAndNotify());
      } else {
        this.closeAndNotify();
      }
    });
  }

  private closeAndNotify() {
    this.dialog.close();
    this.snackBar.open('Project created', null, <MdSnackBarConfig>{ duration: 2000 });
  }

  addProduct() {
    this.products = [...this.products, { name: '', value: 0 }];
  }

  removeProduct(index: number) {
    this.products.splice(index, 1);
  }
}
