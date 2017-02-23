import { Injectable } from '@angular/core';
import 'rxjs'

import { DataProviderService, SubjectBag } from "../../data-provider.service";

@Injectable()
export class UserService {
  private users: SubjectBag;

  constructor(private provider: DataProviderService) {
    this.users = this.provider.get('users');
  }

  getUsers(){
    return this.users;
  }
}

