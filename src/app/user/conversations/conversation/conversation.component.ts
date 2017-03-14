import { Component, OnInit } from '@angular/core';
import { MessageService } from "./message.service";
import { ActivatedRoute } from "@angular/router";
import { ConversationsService } from "../conversations.service";
import { Conversation, Message } from "../../../shared/templates";

@Component({
  selector: 'sf-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  private conversation: Conversation;
  private messages: Message[];

  constructor(private conversationService: ConversationsService,
              private messageService: MessageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let path = this.route.snapshot.url[0].path;
    let conversationSubject = this.conversationService.find(path);
    conversationSubject.subscribe(d => this.conversation = d as Conversation);

    let messageSubject = this.messageService.all(path);
    messageSubject.subscribe(d => this.messages = d as Message[]);

    this.messageService
      .onPost(messageSubject, this.onNewMessage)
      .onEdit(messageSubject)
      .onDelete(messageSubject);


  }

  sendMessage(message: string){
    let response = this.conversationService.sendNew(message, this.route.snapshot.url[0].path);
  }

  onNewMessage(message){

  }


  getFullPath(){
    let url = [];
    this.route.pathFromRoot.map(entry => entry.snapshot.url.map(data => data.path).forEach(e => url.push(e)));
    return url;
  }
}
