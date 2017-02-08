import { Injectable } from '@angular/core';
import 'rxjs'

import { DataProviderService } from "../../data-provider.service";

@Injectable()
export class UserService {

  private path: string = 'users';

  constructor(
    private provider: DataProviderService
  ) { }

  getUsers(){
    return this.provider.get([this.path]);
  }
}
