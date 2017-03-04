import { Injectable } from '@angular/core';
import { DataProviderService } from "../../data-provider.service";

@Injectable()
export class TeamService {

  constructor(private provider: DataProviderService) {}

  all(param?: string){
    return this.provider.get('users', param);
  }

  find(id: string, param?: string){
    return this.provider.get(id, param);
  }

  onPost(subject, callback?){
    subject.listen('TeamAdded', team => {
      subject.add(team);
      callback(team);
    })
  }

  onEdit(subject, callback?){
    subject.listen('TeamEdited', team => {
      subject.edit(team);
      callback(team);
    })
  }

  onRemove(subject, callback?){
    subject.listen('TeamRemoved', team => {
      subject.remove(team);
      callback(team);
    })
  }

}
