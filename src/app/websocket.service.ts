import { Injectable } from '@angular/core';
import * as Echo from 'laravel-echo';
import { Observable, Subject } from "rxjs";

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

    this.getEvents('test', 'TestSent');
  }

  getEvents(ch:string, event:string){
    let sub = new Subject();
    this.echo.channel(ch).listen(event, data => {console.log(data as string);sub.next(data)});
    return sub;
  }

}
