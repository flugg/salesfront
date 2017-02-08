import {Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { WebsocketService } from "./websocket.service";

@Injectable()
export class DataProviderService {

  constructor(protected api: ApiService,
              private socket: WebsocketService) { }

  get(subUri: string[]): any{
    let userSub = this.socket.getEvents('test', 'TestSent');
    this.api.get(subUri).subscribe( data => userSub.next(data));
    return userSub;
  }


}
