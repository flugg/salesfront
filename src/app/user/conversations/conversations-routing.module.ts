import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationsComponent } from "./conversations.component";
import { ConversationComponent } from "./conversation/conversation.component";

const routes: Routes = [
  {
    path: '',
    component: ConversationsComponent
  },
  {
    path: ':id',
    component: ConversationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ConversationsRoutingModule { }
