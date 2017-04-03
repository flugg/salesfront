import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import * as Pusher from 'pusher-js';
import * as Echo from 'laravel-echo';

import { TokenService } from './auth/token.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class SocketApiService {

  private echo;

  constructor(private tokenService: TokenService,
              private auth: AuthService,
              private snackBar: MdSnackBar) {
    this.connect();
  }

  connect() {
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

    this.echo.connector.pusher.connection.bind('disconnected', () => this.handleDisconnection());
    this.echo.connector.pusher.connection.bind('unavailable', () => this.handleDisconnection());
    this.echo.connector.pusher.connection.bind('error', error => this.handleDisconnection(error));
    this.echo.connector.pusher.connection.bind('failed', error => this.handleDisconnection(error));
  }

  handleDisconnection(error?: Error) {
    console.log('asf');
    const snackBar = this.snackBar.open('Disconnected', 'Reconnect');
    snackBar.onAction().subscribe(() => {
      snackBar.dismiss();
      this.echo.connector.connect();
      this.snackBar.open('Reconnecting....');
      this.echo.connector.pusher.connection.bind('connected', () => {
        this.snackBar.open('Connected', null, { duration: 3000 });
        this.echo.connector.pusher.connection.unbind('connected');
      });
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
      this.listen(`users.${user.id}`, event, callback);
    });
  }
}

