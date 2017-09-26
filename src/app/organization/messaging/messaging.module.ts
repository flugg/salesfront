import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { OrganizationSharedModule } from '../shared/organization-shared.module';
import { MessagingRoutingModule } from './messaging-routing.module';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { BottomInputComponent } from './shared/bottom-input/bottom-input.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { MessageBoxComponent } from './conversation/message-box/message-box.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { StartConversationComponent } from './start-conversation/start-conversation.component';
import { ConversationTitlePipe } from './shared/conversation-title.pipe';
import { FilteredConversationsPipe } from './conversation-list/filtered-conversations';
import { FilteredMembersPipe } from './add-participant/filtered-members.pipe';
import { FilteredParticipationsPipe } from './shared/filtered-participations.pipe';

@NgModule({
  imports: [
    SharedModule,
    OrganizationSharedModule,
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
    FilteredMembersPipe
  ]
})
export class MessagingModule {}
