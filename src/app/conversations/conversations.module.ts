import { NgModule } from '@angular/core';
import { ConversationsRoutingModule } from './conversations-routing.module';
import { ConversationsComponent } from './conversations.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
    ConversationsRoutingModule
  ],
  declarations: [ConversationsComponent]
})
export class ConversationsModule { }
