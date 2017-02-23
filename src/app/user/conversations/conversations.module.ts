import { NgModule } from '@angular/core';
import { ConversationsRoutingModule } from './conversations-routing.module';
import { ConversationsComponent } from './conversations.component';
import { SharedModule } from "../../shared/shared.module";
import { ConversationComponent } from './conversation/conversation.component';

@NgModule({
  imports: [
    SharedModule,
    ConversationsRoutingModule
  ],
  declarations: [ConversationsComponent, ConversationComponent]
})
export class ConversationsModule { }
