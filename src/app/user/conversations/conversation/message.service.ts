import { Injectable } from '@angular/core';
import { DataProviderService } from "../../../data-provider.service";

@Injectable()
export class MessageService {

  constructor(private provider: DataProviderService) { }

  all(id?){
    return this.provider.openChannel('conversations/' + id + '/messages', 'conversations.' + id);
  }

  onPost(subject, callback?){
    subject.channel.listen('MessageAdded', message => {
      callback(message);
      subject.add(message);
    });
    return this;
  }

  onEdit(subject, callback?){
    subject.channel.listen('MessageEdited', message => {
      callback(message);
      subject.edit(message);
    });
    return this;
  }

  onDelete(subject, callback?){
    subject.channel.listen('MessageRemoved', message => {
      callback(message);
      subject.remove(message);
    });
    return this;
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
}
