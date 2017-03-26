import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MessagingRoutingModule } from './messaging-routing.module';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationService } from './shared/conversation.service';
import { MessageService } from './shared/message.service';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { ParticipatingPipe } from './shared/participating.pipe';
import { AddParticipantComponent } from './add-participant/add-participant.component';

@NgModule({
  imports: [
    MessagingRoutingModule,
    SharedModule,
  ],
  declarations: [
    ConversationComponent,
    ConversationListComponent,
    ParticipantListComponent,
    ParticipatingPipe,
    AddParticipantComponent,
  ],
  providers: [
    ConversationService,
    MessageService,
  ],
})
export class MessagingModule {}
