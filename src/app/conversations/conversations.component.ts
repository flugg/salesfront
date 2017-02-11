import { Component, OnInit } from '@angular/core';
import { User } from "../projects/users/user";

@Component({
  selector: 'sf-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {

  private conversation: Conversation;

  constructor() { }

  ngOnInit() {
  }

}

export class Conversation{
  id: string;
  memberIds: User[];
  MessageIds: Message[];
}

export class Message{
  author: string;
  content: string;
  createdAt: string;
  lastEdited: string;
}


