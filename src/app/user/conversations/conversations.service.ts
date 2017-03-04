import { Injectable } from '@angular/core';
import { DataProviderService, SubjectBag } from "../../data-provider.service";
import { isUndefined } from "util";

@Injectable()
export class ConversationsService {

  constructor(private provider: DataProviderService) {}

  all(){
    return this.provider.openChannel('conversations', 'user.id');
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
    subject.channel.listen('MessageSent', message => {
      callback(message);
      subject.getValue().lastMessage = message;
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
    subject.channel.listen('ParticipantAdded', p => {
      callback(p);
      subject.getValue().splice(subject.getValue().indexOf(p), 1);
    });
    return this;
  }
}
