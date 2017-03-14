import { Injectable } from '@angular/core';
import { Session } from "../shared/templates";
import { AuthService } from "../auth/auth.service";
import { DataProviderService } from "../data-provider.service";

@Injectable()
export class UserService {

  constructor(private provider: DataProviderService) {}

  all(param?: string){
    return this.provider.get('users', param);
  }

  find(id: string, param?: string){
    return this.provider.get(id, param);
  }

  onPost(subject, callback?){
    subject.listen('UserAdded', user => {
      subject.add(user);
      callback(user);
    })
  }

  onEdit(subject, callback?){
    subject.listen('UserEdited', user => {
      subject.edit(user);
      callback(user);
    })
  }

  onRemove(subject, callback?){
    subject.listen('UserRemoved', user => {
      subject.remove(user);
      callback(user);
    })
  }

}
