import { Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import * as Pusher from 'pusher-js';
import * as Echo from 'laravel-echo';

import { TokenService } from './auth/token.service';
import { environment } from '../../environments/environment';

@Injectable()
export class SocketApiService {
  private echo;

  constructor(private tokenService: TokenService,
              private snackBar: MdSnackBar) {
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
  }

  private handleDisconnect() {
    const snackBar = this.snackBar.open('Disconnected', 'Reconnect');
    snackBar.onAction().subscribe(() => {
      snackBar.dismiss();
      this.echo.connector.connect();
      this.snackBar.open('Reconnecting....');
    });

    this.getPusher().connection.bind('connected', () => {
      this.snackBar.open('Connected', null, <MdSnackBarConfig>{ duration: 1500 });
      this.getPusher().connection.unbind('connected');
    });
  }
}

