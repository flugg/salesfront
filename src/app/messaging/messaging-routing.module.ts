import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { AddParticipantComponent } from './add-participant/add-participant.component';

const routes: Routes = [
  {
    path: '',
    component: ConversationListComponent,
  },
  {
    path: ':id',
    component: ConversationComponent,
  },
  {
    path: ':id/participants',
    component: ParticipantListComponent,
  },
  {
    path: ':id/participants/add',
    component: AddParticipantComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
})
export class MessagingRoutingModule {}
