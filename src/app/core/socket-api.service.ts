import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';
import * as Echo from 'laravel-echo';

@Injectable()
export class SocketApiService {

  private echo;

  constructor() {
    window['Pusher'] = Pusher;
    this.echo = new Echo({
      auth: {
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLnZlbmR1bW8uY29tL3Rva2VucyIsImlhdCI6MTQ4OTQ5NTg5NSwiZXhwIjoxNDkwNzA1NDk1LCJuYmYiOjE0ODk0OTU4OTUsImp0aSI6IjEyclNzckhSWXZRbERCMmUiLCJzdWIiOjF9.ltgNX74bvWtmVNgSvFqxgtn6UmWA1_ciAi-3NPCbyJo',
        },
      },
      authEndpoint: 'http://api.vendumo.com/broadcasting/auth',
      broadcaster: 'pusher',
      key: '22dde1271dab2d4b1da0',
      secret: '4881a3a6d6bec748fa58',
      cluster: 'eu',
      encrypted: true,
      namespace: '',
    });
  }

  getChannel(channel: string) {
    return this.echo.private(channel);
  }

  listen(channel: string, event: string, callback: Function) {
    return this.getChannel(channel).listen(event, callback);
  }

  listenForUser(id: string, event: string, callback: Function) {
    return this.listen(`users.${id}`, event, callback);
  }
}

