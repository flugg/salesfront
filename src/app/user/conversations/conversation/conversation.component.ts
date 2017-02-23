import { Component, OnInit } from '@angular/core';
import { ConversationService } from "./conversation.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'sf-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  private conversation;
  private uri = 'conversations/1';

  constructor(private service: ConversationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let socket = this.service.getConversation(this.uri);
    socket.subscribe(data => this.conversation = data);
    this.conversation = socket; // TODO: hack until api is up, remove async pipe with this

    this.service.onNewMessage().subscribe(e => console.log('new message added by ' + e.userId + ' saying:\n' + e.body));
    this.service.onDeleteMessage();
    this.service.onEditMessage();

    this.service.onNewParticipation().subscribe(e => this.conversation.getValue().messages.push(e));
    this.service.onDeleteParticipation();
  }

  sendMessage(message: string){
    if(message.length < 1)
      return;
    let response = this.service.sendNew(message, this.uri);
  }


  getFullPath(){
    let url = [];
    this.route.pathFromRoot.map(entry => entry.snapshot.url.map(data => data.path).forEach(e => url.push(e)));
    console.log(url);
    return url;
  }

}
