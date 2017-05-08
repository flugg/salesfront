import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ErrorsRoutingModule } from '../errors/errors-routing.module';
import { PageNotFoundComponent } from '../errors/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    SharedModule,
    ErrorsRoutingModule
  ],
  declarations: [
    PageNotFoundComponent
  ]
})
export class ErrorsModule {}