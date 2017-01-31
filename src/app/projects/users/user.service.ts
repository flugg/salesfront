import { Injectable } from '@angular/core';
import 'rxjs'

import { ApiService } from "../../api.service";

@Injectable()
export class UserService {

  private path: string = 'users';

  constructor(private api: ApiService) { }

  getUsers(){
    return this.api.get(this.path);
  }
}
