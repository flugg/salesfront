import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from "./users.component";
import { SharedModule } from "../../shared/shared.module";
import { DataProviderService } from "../../data-provider.service";

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent
  ],
  providers: [
    DataProviderService
  ]
})
export class UsersModule { }
