import { Injectable } from '@angular/core';
import { DataProviderService } from "../../data-provider.service";

@Injectable()
export class FeedService {

  constructor(private provider: DataProviderService) { }

  all(){
    return this.provider.get('feed');
  }

  onPost(subject, callback?){
    subject.listen('PostAdded', post => {
      subject.add(post);
      callback(post);
    })
  }

  onEdit(subject, callback?){
    subject.listen('PostEdited', post => {
      subject.edit(post);
      callback(post);
    })
  }

  onRemove(subject, callback?){
    subject.listen('PostRemoved', post => {
      subject.remove(post);
      callback(post);
    })
  }

}
