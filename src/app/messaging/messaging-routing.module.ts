import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessagingComponent } from './messaging.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { UserResolver } from '../core/auth/user-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MessagingComponent,
    resolve: UserResolver,
    children: [
      {
        path: '',
        component: ConversationListComponent,
        children: [
          {
            path: ':id',
            component: ConversationComponent,
            children: [
              {
                path: 'participants',
                component: ParticipantListComponent,
                children: [
                  {
                    path: 'add',
                    component: AddParticipantComponent,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
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
export class MessagingRoutingModule {
}
