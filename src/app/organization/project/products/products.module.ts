import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { OrganizationSharedModule } from '../../shared/organization-shared.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
    ProductsRoutingModule
  ],
  declarations: [
    CreateProductComponent,
    EditProductComponent,
    ProductListComponent
  ]
})
export class ProductsModule {}
