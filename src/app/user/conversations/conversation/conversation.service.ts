import { Injectable } from '@angular/core';
import { DataProviderService } from "../../../data-provider.service";

@Injectable()
export class ConversationService {
  private conversation;

  constructor(private provider: DataProviderService) { }

  getConversation(uri: string){
    this.conversation = this.provider.openChannel(uri, 'conversations.id'); //.get(['conversations/1']); //
    return this.conversation;
  }

  sendNew(data: any, subUri: string){
    let payload = { body: data, userId: 'user'};
    let reply = this.provider.post(payload, subUri);
    return reply;
  }

  edit(data: any, subUri: string){
    let reply = this.provider.edit(data, subUri);
    return reply;
  }

  onNewMessage(){
    return this.conversation.channel.listen('MessageAdded',
      e => this.conversation.getValue().messages.push(e));
  }

  onEditMessage(){
    return this.conversation.channel.listen('MessageEdited',
      e => this.conversation.messages.map(f => { if (f.id === e.id) f = e; }));
  }

  onDeleteMessage(){
    return this.conversation.channel.listen('MessageDeleted',
      e => {
        let messages = this.conversation.messages;
        messages.splice(messages.indexOf(e), 1);
      });
  }

  onNewParticipation(){
    return this.conversation.channel.listen('ParticipationAdded',
      e => this.conversation.getValue().participations.push(e));
  }

  onDeleteParticipation(){
    return this.conversation.channel.listen('ParticipationDeleted',
      e => {
        let participations = this.conversation.participations;
        participations.splice(participations.indexOf(e), 1);
      });
  }

}
