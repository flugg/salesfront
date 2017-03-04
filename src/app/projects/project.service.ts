import { Injectable } from '@angular/core';
import { DataProviderService } from "../data-provider.service";

@Injectable()
export class ProjectService {

  constructor(private provider: DataProviderService) { }

  all(){
    return this.provider.get('projects');
  }

  find(id: string){
    return this.provider.get('projects/' + id);
  }

  onPost(subject, callback?){
    subject.listen('ProjectAdded', post => {
      subject.add(post);
      callback(post);
    })
  }

  onEdit(subject, callback?){
    subject.listen('ProjectEdited', post => {
      subject.edit(post);
      callback(post);
    })
  }

  onRemove(subject, callback?){
    subject.listen('ProjectRemoved', post => {
      subject.remove(post);
      callback(post);
    })
  }

}
