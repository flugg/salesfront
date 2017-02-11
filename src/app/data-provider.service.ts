import { Injectable } from '@angular/core';

import { BehaviorSubject } from "rxjs";
import any = jasmine.any;

import { ApiService } from "./api.service";
import { WebsocketService } from "./websocket.service";


@Injectable()
export class DataProviderService {

  constructor(protected api: ApiService,
              private socket: WebsocketService) { }

  get(subUri: string[]): BehaviorSubject<any>{
    let sub = new BehaviorSubject(null);
    this.api.get(subUri).subscribe(data => sub.next(data));
    return sub;
  }

  sub(ch: string, event: string): BehaviorSubject<any>{
    let sub = this.socket.getEvents(ch, event);
    return sub;
  }

  subscribe(ch: string, event: string, callback){
    let sub = new BehaviorSubject({});
    sub = this.socket.getEvents(ch, event);
    sub.subscribe(event => callback(event));
  }
}
