import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { ApiService } from "./api.service";
import { WebsocketService } from "./websocket.service";


@Injectable()
export class DataProviderService {

  constructor(protected api: ApiService,
              private socket: WebsocketService) { }

  get(subUri: string, param?: string){
    param? param = '?' + param : param = '';
    return this.api.get(subUri + param);
  }

  openChannel(subUri: string, channel: string): SubjectBag{
    return new SubjectBag(this.get(subUri), this.socket.getChannel(channel));
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

  constructor(observable, channel){
    super(null);
    observable.subscribe(d => this.next(d));
    this.channel = channel;
  }

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

  public findById(id){
    for(let o of this.getValue()){
      if(o.id === id) return o;
    }
  }
}

