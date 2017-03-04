import { Component, OnInit } from '@angular/core';
import { ConversationsService } from "./conversations.service";
import { Conversation } from "../../shared/templates";

@Component({
  selector: 'sf-conversations',
  templateUrl: 'conversations.component.html',
  styleUrls: ['conversations.component.css']
})
export class ConversationsComponent implements OnInit {
  private conversations: Conversation[];

  constructor(private service: ConversationsService) { }

  ngOnInit() {
    let conversationsSubject = this.service.all();
    conversationsSubject.subscribe(data => this.conversations = data as Conversation[]);

    this.service
      .onPost(conversationsSubject)
      .onParticipantAdded(conversationsSubject)
      .onParticipantRemoved(conversationsSubject);
  }


}


