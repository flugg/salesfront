import { Injectable } from '@angular/core';
import 'rxjs'

import { DataProviderService } from "../../data-provider.service";
import { BehaviorSubject } from "rxjs";
import { User } from "./user";
import { DataController } from "../../DataController";

@Injectable()
export class UserService {
  private users: BehaviorSubject<User[]>;
  private path: string = 'users';


  constructor(private provider: DataProviderService) { }

  getUsers(){
    //this.dataProvider = new DataController(this.provider, 'user.id', [this.path]);
    //return this.dataProvider.subject.asObservable();
    this.provider.subscribe('user.id', 'user', [this.path]);
    return this.provider.subject.asObservable();
  }

  getOptional(){
    this.users = this.provider.get([this.path]);
    this.provider.listen('project.id', 'addUser').subscribe(event => this.onAdd(event));
    this.provider.listen('project.id', 'removeUser').subscribe(event => this.onRemove(event));
    //this.provider.subscribe('project.id', 'addUser', this.onAdd);
    return this.users.asObservable();
  }

  onAdd(user?: User){
    if(user === null) return;
    this.users.getValue().push(user);
  }
  onRemove(user?: User){
    if(user === null) return;
    this.users.getValue().splice(this.users.getValue().indexOf(user), 1);
  }
}

