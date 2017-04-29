import { NgModule } from '@angular/core';

import { ErrorsRoutingModule } from '../errors/errors-routing.module';
import { PageNotFoundComponent } from '../errors/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    ErrorsRoutingModule
  ],
  declarations: [
    PageNotFoundComponent
  ]
})
export class ErrorsModule {}