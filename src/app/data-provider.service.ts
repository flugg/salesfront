import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import any = jasmine.any;

import { ApiService } from "./api.service";
import { WebsocketService } from "./websocket.service";


@Injectable()
export class DataProviderService {

  constructor(protected api: ApiService,
              private socket: WebsocketService) { }

  get(subUri: string){
    let sub = new SubjectBag(null);
    this.api.get(subUri).subscribe(data => sub.next(data));
    return sub;
  }

  openChannel(subUri: string, channel: string){
    let resourceSocket = new SubjectBag(null);
    this.api.get(subUri).subscribe(data => resourceSocket.next(data));

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

export class SubjectBag extends BehaviorSubject<any[]>{

  public channel: any;

  public onAdd(entry?){
    if(entry === null) return;
    this.getValue().push(entry);
  }

  private onRemove(entry?){
    if(entry === null) return;
    this.getValue().splice(this.getValue().indexOf(entry), 1);
  }

  private onEdit(entry?){
    if(entry === null) return;
    for (let e of this.getValue()){
      if(entry.id === e.id)
        e = entry;
    }
  }
}
