import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/first';

import { Project } from '../../../../core/models/project.model';
import { ProductService } from '../../../../core/services/product.service';
import { ActiveProjectService } from '../../../active-project.service';

@Component({
  templateUrl: 'create-product.component.html'
})
export class CreateProductComponent implements OnInit {
  pending = false;
  loading = true;
  project: Project;
  name: string;
  value = 0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private activeProjectService: ActiveProjectService,
              private productService: ProductService) {}

  ngOnInit() {
    this.activeProjectService.project.first().subscribe(project => {
      this.project = project;
      this.loading = false;
    });
  }

  submit() {
    this.pending = true;
    this.productService.create(this.project.id, { name: this.name, value: this.value }).then(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
      this.snackBar.open('Product created', null, <MdSnackBarConfig>{ duration: 2000 });
      this.pending = false;
    });
  }
}
