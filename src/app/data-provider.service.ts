import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import any = jasmine.any;

import { ApiService } from "./api.service";
import { WebsocketService } from "./websocket.service";


@Injectable()
export class DataProviderService {

  constructor(protected api: ApiService,
              private socket: WebsocketService) { }

  get(subUri: string, param?: string){
    param? param = '?' + param : param = '';
    return this.api.get(subUri + param) as BehaviorSubject<any>;
  }

  openChannel(subUri: string, channel: string): SubjectBag{
    let resourceSocket = this.get(subUri) as SubjectBag; //.subscribe(data => resourceSocket.next(data));
    resourceSocket.channel = this.socket.getChannel(channel);
    return resourceSocket;
  }

  post(payload: any, subUri: string){
    return this.api.create(payload, subUri);
  }

  edit(payload: any, subUri: string){
    return this.api.put(payload, subUri);
  }
}

export class SubjectBag extends BehaviorSubject<any>{
  public channel;

  public add(entry?){
    if(entry === null) return;
    this.getValue().push(entry);
  }

  public remove(entry?){
    if(entry === null) return;
    this.getValue().splice(this.getValue().indexOf(entry), 1);
  }

  public edit(entry?){
    if(entry === null) return;
    for (let e of this.getValue()){
      if(entry.id === e.id)
        e = entry;
    }
  }
}

