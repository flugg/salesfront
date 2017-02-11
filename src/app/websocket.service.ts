import { Injectable } from '@angular/core';
import * as Echo from 'laravel-echo';
import { BehaviorSubject } from "rxjs";

@Injectable()
export class WebsocketService {

  private echo;

  constructor() {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: '22dde1271dab2d4b1da0',
      secret: '4881a3a6d6bec748fa58',
      cluster: 'eu',
      encrypted: true
    });
  }

  getEvents(ch:string, event:string){
    let sub = new BehaviorSubject(null);
    this.echo.channel(ch).listen(event, data => sub.next(data));
    return sub;
  }
}

