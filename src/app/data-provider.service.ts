import { Injectable } from '@angular/core';

import { BehaviorSubject } from "rxjs";
import any = jasmine.any;

import { ApiService } from "./api.service";
import { WebsocketService } from "./websocket.service";


@Injectable()
export class DataProviderService {
  public subject: BehaviorSubject<any[]>;

  private eventSuffix: string;

  constructor(protected api: ApiService,
              private socket: WebsocketService) { }

  subscribe(channel: string, event: string, path: string[]){
    this.eventSuffix = event;
    this.subject = this.get(path);
    this.listen(channel, this.eventNamer('add')).subscribe(event => this.onAdd(event));
    this.listen(channel, this.eventNamer('remove')).subscribe(event => this.onRemove(event));
    this.listen(channel, this.eventNamer('edit')).subscribe(event => this.onEdit(event));
  }

  get(subUri: string[]): BehaviorSubject<any>{
    let sub = new BehaviorSubject(null);
    this.api.get(subUri).subscribe(data => sub.next(data));
    return sub;
  }

  listen(ch: string, event: string): BehaviorSubject<any>{
    let sub = this.socket.getEvents(ch, event);
    return sub;
  }

  private onAdd(entry?){
    if(entry === null) return;
    this.subject.getValue().push(entry);
  }

  private onRemove(entry?){
    if(entry === null) return;
    this.subject.getValue().splice(this.subject.getValue().indexOf(entry), 1);
  }

  private onEdit(entry?){
    if(entry === null) return;
    for (let e of this.subject.getValue()){
      if(entry.id === e.id)
        e = entry;
    }
  }

  private eventNamer(prefix: string): string {
    return prefix + this.eventSuffix;
  }

}
