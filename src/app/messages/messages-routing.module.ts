import {Routes, RouterModule} from "@angular/router";
import {MessagesComponent} from "./messages.component";
import {NgModule} from "@angular/core";
/**
 * Created by danielsteen on 24/01/2017.
 */

const messagesRoutes: Routes = [
  {
    path: 'messages',
    component: MessagesComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(messagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class MessagesRoutingModule {}
