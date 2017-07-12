import { Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import * as Pusher from 'pusher-js';
import * as Echo from 'laravel-echo';

import { TokenService } from '../auth/token.service';

@Injectable()
export class SocketApiService {

  /**
   * The Laravel Echo instance.
   */
  private echo;

  /**
   * Constructs the service.
   */
  constructor(private tokenService: TokenService,
              private snackBar: MdSnackBar) {
    this.connect();
  }

  /**
   * Listens for an event in the current user channel and registers a callback.
   */
  listenForUser(userId: string, events: any, source: any) {
    const channel = this.getChannel(`users.${userId}`);
    this.listen(channel, events, source);
  }

  /**
   * Listens for an event in the given conversation and registers a callback.
   */
  listenForConversation(conversationId: string, events: any, source: any) {
    const channel = this.getChannel(`conversations.${conversationId}`);
    this.listen(channel, events, source);
  }

  /**
   * Listens for an event in the given project and registers a callback.
   */
  listenForProject(projectId: string, events: any, source: any) {
    const channel = this.getChannel(`projects.${projectId}`);
    this.listen(channel, events, source);
  }

  /**
   * Unbinds all callbacks from a given source.
   */
  stopListening(source: any) {
    this.getPusher().allChannels().forEach(channel => {
      channel.unbind(null, null, source);
    });
  }

  /**
   * Connects to Pusher using Laravel Echo.
   */
  private connect() {
    window['Pusher'] = Pusher;
    this.echo = new Echo({
      auth: { headers: { 'Authorization': `Bearer ${this.tokenService.get()}` } },
      authEndpoint: 'http://api.vendumo.com/broadcasting/auth',
      broadcaster: 'pusher',
      key: '22dde1271dab2d4b1da0',
      secret: '4881a3a6d6bec748fa58',
      cluster: 'eu',
      encrypted: true,
      namespace: ''
    });

    this.listenForDisconnects();
  }

  /**
   * Retrieves the Pusher instance from Laravel Echo.
   */
  private getPusher() {
    return this.echo.connector.pusher;
  }

  /**
   * Retrieves a channel instance.
   */
  private getChannel(channel: string) {
    return this.echo.private(channel);
  }

  /**
   * Listens for an event and registers a callback.
   */
  private listen(channel, events: any, source: any) {
    for (const event in events) {
      channel.subscription.bind(channel.eventFormatter.format(event), events[event], source);
    }
  }

  /**
   * Listens for disconnects from Pusher.
   */
  private listenForDisconnects() {
    this.getPusher().connection.bind('disconnected', () => this.handleDisconnect());
  }

  /**
   * Handles a disconnection from Pusher.
   */
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

