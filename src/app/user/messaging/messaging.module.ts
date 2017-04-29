import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MessagingRoutingModule } from './messaging-routing.module';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { BottomInputComponent } from '../messaging/shared/bottom-input/bottom-input.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { MessageBoxComponent } from './conversation/message-box/message-box.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { StartConversationComponent } from './start-conversation/start-conversation.component';
import { ConversationTitlePipe } from './shared/conversation-title.pipe';
import { FilteredConversationsPipe } from './conversation-list/filtered-conversations';
import { FilteredParticipationsPipe } from './shared/filtered-participations.pipe';
import { FilteredUsersPipe } from './add-participant/filtered-users.pipe';
import { ConversationService } from './shared/conversation.service';
import { MessageService } from './shared/message.service';

@NgModule({
  imports: [
    SharedModule,
    MessagingRoutingModule
  ],
  declarations: [
    AddParticipantComponent,
    BottomInputComponent,
    ConversationListComponent,
    ConversationComponent,
    MessageBoxComponent,
    ParticipantListComponent,
    StartConversationComponent,
    ConversationTitlePipe,
    FilteredConversationsPipe,
    FilteredParticipationsPipe,
    FilteredUsersPipe
  ],
  providers: [
    ConversationService,
    MessageService
  ]
})
export class MessagingModule {}
