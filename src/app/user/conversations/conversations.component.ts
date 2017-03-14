import { Component, OnInit } from '@angular/core';
import { ConversationsService } from "./conversations.service";
import { Conversation } from "../../shared/templates";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'sf-conversations',
  templateUrl: 'conversations.component.html',
  styleUrls: ['conversations.component.css']
})
export class ConversationsComponent implements OnInit {
  private conversations: Conversation[];

  constructor(private service: ConversationsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let conversationsSubject = this.service.all();
    conversationsSubject.subscribe(data => this.conversations = data as Conversation[]);

    this.service
      .onPost(conversationsSubject)
      .lastMessage(conversationsSubject)
      .onParticipantAdded(conversationsSubject)
      .onParticipantRemoved(conversationsSubject);
  }

  participationName(conversation, id){
    for(let p of conversation.participations){
      if(p.user.id == id) return p.user.name;
    }
  }

  navigate(id){
    this.router.navigate([id], { relativeTo: this.route });
  }
}


