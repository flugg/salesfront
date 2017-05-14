import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { StartConversationComponent } from './start-conversation/start-conversation.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { AddParticipantComponent } from './add-participant/add-participant.component';

const routes: Routes = [
  {
    path: '',
    component: ConversationListComponent,
    children: [
      {
        path: 'new',
        component: StartConversationComponent
      },
      {
        path: ':conversation',
        component: ConversationComponent,
        children: [
          {
            path: 'participants',
            component: ParticipantListComponent,
            children: [
              {
                path: 'add',
                component: AddParticipantComponent
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagingRoutingModule {
}
