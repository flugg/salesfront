import { Injectable, ApplicationRef } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import * as Echo from 'laravel-echo';
import * as Pusher from 'pusher-js';

import 'rxjs/add/operator/filter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from '../../environments/environment';
import { TokenService } from './auth/token.service';

@Injectable()
export class SocketApiService {
  private echo;
  private connected = new BehaviorSubject<boolean | null>(null);
  connects = this.connected.filter(connection => connection === true);
  disconnects = this.connected.filter(connection => connection === false);

  constructor(private tokenService: TokenService,
              private snackBar: MdSnackBar,
              private applicationRef: ApplicationRef) {
    this.connect();
  }

  listenForUser(userId: string, events: any, source: any) {
    const channel = this.getChannel(`users.${userId}`);
    this.listen(channel, events, source);
  }

  listenForConversation(conversationId: string, events: any, source: any) {
    const channel = this.getChannel(`conversations.${conversationId}`);
    this.listen(channel, events, source);
  }

  listenForProject(projectId: string, events: any, source: any) {
    const channel = this.getChannel(`projects.${projectId}`);
    this.listen(channel, events, source);
  }

  listenForOrganization(organizationId: string, events: any, source: any) {
    const channel = this.getChannel(`organizations.${organizationId}`);
    this.listen(channel, events, source);
  }

  stopListening(source: any) {
    this.getPusher().allChannels().forEach(channel => {
      channel.unbind(null, null, source);
    });
  }

  reconnectSilently() {
    this.echo = new Echo({
      auth: { headers: { 'Authorization': `Bearer ${this.tokenService.get()}` } },
      authEndpoint: environment.apiUrl + '/broadcasting/auth',
      broadcaster: 'pusher',
      key: '22dde1271dab2d4b1da0',
      secret: '4881a3a6d6bec748fa58',
      cluster: 'eu',
      encrypted: true,
      namespace: ''
    });

    this.listenForDisconnects();
  }

  private connect() {
    window['Pusher'] = Pusher;
    this.echo = new Echo({
      auth: { headers: { 'Authorization': `Bearer ${this.tokenService.get()}` } },
      authEndpoint: environment.apiUrl + '/broadcasting/auth',
      broadcaster: 'pusher',
      key: '22dde1271dab2d4b1da0',
      secret: '4881a3a6d6bec748fa58',
      cluster: 'eu',
      encrypted: true,
      namespace: ''
    });

    this.listenForDisconnects();

    this.getPusher().connection.bind('connected', () => {
      if (this.connected.value === false) {
        this.snackBar.dismiss();
        this.snackBar.open('Reconnected', null, <MdSnackBarConfig>{ duration: 1500 });
      }

      this.connected.next(true);
    });
  }

  private getPusher() {
    return this.echo.connector.pusher;
  }

  private getChannel(channel: string) {
    return this.echo.private(channel);
  }

  private listen(channel, events: any, source: any) {
    for (const event in events) {
      channel.subscription.bind(channel.eventFormatter.format(event), events[event], source);
    }
  }

  private listenForDisconnects() {
    this.getPusher().connection.bind('disconnected', () => this.handleDisconnect());
    this.getPusher().connection.bind('unavailable', () => this.handleDisconnect());
    this.getPusher().connection.bind('error', () => this.handleDisconnect());
  }

  private handleDisconnect() {
    if (this.connected.value !== false) {
      this.connected.next(false);

      const snackBar = this.snackBar.open('Disconnected', 'Reconnect');
      this.applicationRef.tick();

      this.connects.subscribe(() => {
        snackBar.dismiss();
      });

      snackBar.onAction().subscribe(() => {
        if (this.connected.value === true) {
          return;
        }

        snackBar.dismiss();
        this.echo.connector.connect();
      });
    }
  }
}

