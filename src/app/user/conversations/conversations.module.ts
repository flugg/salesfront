import { NgModule } from '@angular/core';
import { ConversationsRoutingModule } from './conversations-routing.module';
import { ConversationsComponent } from './conversations.component';
import { SharedModule } from "../../shared/shared.module";
import { ConversationComponent } from './conversation/conversation.component';
import { MessageDirective } from './conversation/message.directive';

@NgModule({
  imports: [
    SharedModule,
    ConversationsRoutingModule
  ],
  declarations: [ConversationsComponent, ConversationComponent, MessageDirective]
})
export class ConversationsModule { }
