import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MessagingRoutingModule } from './messaging-routing.module';
import { MessagingComponent } from './messaging.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { StartConversationComponent } from './start-conversation/start-conversation.component';
import { ParticipatingPipe } from './shared/participating.pipe';
import { NotParticipatingPipe } from './add-participant/not-participating.pipe';
import { ConversationService } from './shared/conversation.service';
import { MessageService } from './shared/message.service';

@NgModule({
  imports: [
    MessagingRoutingModule,
    SharedModule,
  ],
  declarations: [
    MessagingComponent,
    ConversationComponent,
    ConversationListComponent,
    ParticipantListComponent,
    ParticipatingPipe,
    AddParticipantComponent,
    NotParticipatingPipe,
    StartConversationComponent,
  ],
  providers: [
    ConversationService,
    MessageService,
  ],
})
export class MessagingModule {}
