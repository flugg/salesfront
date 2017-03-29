import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';
import * as Echo from 'laravel-echo';

import { TokenService } from './auth/token.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class SocketApiService {

  private echo;

  constructor(private tokenService: TokenService, private auth: AuthService) {
    window['Pusher'] = Pusher;
    this.echo = new Echo({
      auth: {
        headers: {
          'Authorization': `Bearer ${this.tokenService.get()}`,
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

  listenForUser(event: string, callback: Function) {
    this.auth.user().subscribe(user => {
      if (user.id) {
        this.listen(`users.${user.id}`, event, callback);
      }
    });
  }
}

