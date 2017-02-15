import { Component, OnInit } from '@angular/core';
import { User } from "../projects/users/user";

@Component({
  selector: 'sf-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {
  private conversation: Conversation[];

  constructor() { }

  ngOnInit() {
  }

}

export class Conversation{
  id: string;
  group = false;
  createdAt: string;
  updatedAt: string;
  Messages: Message[];
  participations: User[];
}

export class Message{
  id: string;
  body: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  conversationId: string;
}

export class Participation{
  id: string;
  userId: string;
  conversationId: string;
}


