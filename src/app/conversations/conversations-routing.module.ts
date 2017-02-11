import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversationsComponent } from "./conversations.component";

const routes: Routes = [
  {
    path: '',
    component: ConversationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ConversationsRoutingModule { }
