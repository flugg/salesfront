/**
 * Created by danielsteen on 24/01/2017.
 */

import {NgModule} from "@angular/core";
import {MessagesComponent} from "./messages.component";
import {SharedModule} from "../shared/shared.module";
import {MessagesRoutingModule} from "./messages-routing.module";

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    SharedModule,
    MessagesRoutingModule
  ]
})

export class MessagesModule {}
