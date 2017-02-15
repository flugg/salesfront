import { Injectable } from '@angular/core';
import 'rxjs'

import { DataProviderService } from "../../data-provider.service";
import { BehaviorSubject } from "rxjs";
import { User } from "./user";

@Injectable()
export class UserService {
  private users: BehaviorSubject<User[]>;

  constructor(private provider: DataProviderService) { }

  getUsers(){
    this.provider.subscribe('user.id', 'User', ['users']);
    return this.provider.subject.asObservable();
  }
}

