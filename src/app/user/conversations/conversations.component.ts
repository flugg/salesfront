import { Component, OnInit } from '@angular/core';
import { ConversationsService } from "./conversations.service";

@Component({
  selector: 'sf-conversations',
  templateUrl: 'conversations.component.html',
  styleUrls: ['conversations.component.css']
})
export class ConversationsComponent implements OnInit {
  private conversations;

  constructor(private service: ConversationsService) { }

  ngOnInit() {
    this.service.getConversations().subscribe(data => this.conversations = data);
  }

}


