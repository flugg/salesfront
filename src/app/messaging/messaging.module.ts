import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MessagingRoutingModule } from './messaging-routing.module';
import { BottomInputComponent } from '../messaging/shared/bottom-input/bottom-input.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { MessageBoxComponent } from './conversation/message-box/message-box.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { StartConversationComponent } from './start-conversation/start-conversation.component';
import { FilteredParticipationsPipe } from './shared/filtered-participations.pipe';
import { FilteredConversationsPipe } from './conversation-list/filtered-conversations';
import { FilteredUsersPipe } from './add-participant/filtered-users.pipe';
import { ConversationTitlePipe } from './shared/conversation-title.pipe';
import { ConversationService } from './shared/conversation.service';
import { MessageService } from './shared/message.service';

@NgModule({
  imports: [
    MessagingRoutingModule,
    SharedModule
  ],
  declarations: [
    BottomInputComponent,
    ConversationListComponent,
    ConversationComponent,
    MessageBoxComponent,
    ParticipantListComponent,
    AddParticipantComponent,
    StartConversationComponent,
    FilteredParticipationsPipe,
    FilteredConversationsPipe,
    FilteredUsersPipe,
    ConversationTitlePipe
  ],
  providers: [
    ConversationService,
    MessageService
  ]
})
export class MessagingModule {}
