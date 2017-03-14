import { Injectable } from '@angular/core';
import { DataProviderService, SubjectBag } from "../../data-provider.service";

@Injectable()
export class ConversationsService {

  constructor(private provider: DataProviderService) {}

  all(){
    return this.provider.openChannel('conversations', 'users.1');
  }

  find(id: string): SubjectBag {
      return this.provider.openChannel('conversations/' + id, 'user.id');
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

  onPost(subject, callback?){
    subject.channel.listen('Messaging.ConversationStarted', conversation => {
    console.log(conversation);
      if(callback) callback(conversation);
      subject.getValue().push(conversation);
    });
    return this;
  }

  lastMessage(subject, callback?){
    subject.channel.listen('MessageAdded', message => {
      callback(message.conversationId);
      subject.findById(message.conversationId).lastMessage = message;
    });
      return this;
  }

  onParticipantAdded(subject, callback?){
    subject.channel.listen('ParticipantAdded', p => {
      callback(p);
      subject.getValue().participations.push(p);
    });
    return this;
  }

  onParticipantRemoved(subject, callback?){
    subject.channel.listen('ParticipantRemoved', p => {
      callback(p);
      let c = subject.findById(p.conversationId);
      c.splice(c.participations.indexOf(p), 1);
    });
    return this;
  }
}
