import { Injectable } from '@angular/core';

import { BehaviorSubject } from "rxjs";
import any = jasmine.any;

import { ApiService } from "./api.service";
import { WebsocketService } from "./websocket.service";


@Injectable()
export class DataProviderService {
  public subject: BehaviorSubject<any[]>;

  private eventPrefix: string;
  private channel: string;

  constructor(protected api: ApiService,
              private socket: WebsocketService) { }

  subscribe(channel: string, event: string, path: string[]){
    this.channel = channel;
    this.eventPrefix = event;
    this.subject = this.get(path);
    this.crud();
  }

  crud(){
    this.listen(this.channel, this.eventNamer('Added')).subscribe(event => this.onAdd(event));
    this.listen(this.channel, this.eventNamer('Removed')).subscribe(event => this.onRemove(event));
    this.listen(this.channel, this.eventNamer('Edited')).subscribe(event => this.onEdit(event));
  }

  listen(ch: string, event: string): BehaviorSubject<any>{
    let sub = this.socket.getEvents(ch, event);
    return sub;
  }

  private get(subUri: string[]): BehaviorSubject<any>{
    let sub = new BehaviorSubject(null);
    this.api.get(subUri).subscribe(data => sub.next(data));
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

  private eventNamer(suffix: string): string {
    return this.eventPrefix + suffix;
  }

}

export class domainMap{
  add: string;
  remove: string;
  edit: string
}
