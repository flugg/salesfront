import { Injectable } from '@angular/core';

let Echo;

@Injectable()
export class WebsocketService {

  constructor() {
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: 'your-pusher-key',
      cluster: 'eu',
      encrypted: true
    });
  }

}
