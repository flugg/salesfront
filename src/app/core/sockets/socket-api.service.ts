import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
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
   * Connects to Pusher using Laravel Echo.
   */
  connect() {
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
   * Listens for disconnects from Pusher.
   */
  listenForDisconnects() {
    this.getPusher().connection.bind('disconnected', () => this.handleDisconnect());
    this.getPusher().connection.bind('unavailable', () => this.handleDisconnect());
    this.getPusher().connection.bind('error', error => this.handleDisconnect());
    this.getPusher().connection.bind('failed', error => this.handleDisconnect());
  }

  /**
   * Handles a disconnection from Pusher.
   */
  handleDisconnect() {
    const snackBar = this.snackBar.open('Disconnected', 'Reconnect');
    snackBar.onAction().subscribe(() => {
      snackBar.dismiss();
      this.echo.connector.connect();
      this.snackBar.open('Reconnecting....');
    });

    this.getPusher().connection.bind('connected', () => {
      this.snackBar.open('Connected', null, { duration: 3000 });
      this.getPusher().connection.unbind('connected');
    });
  }

  /**
   * Retrieves the Pusher instance from Laravel Echo.
   */
  getPusher() {
    return this.echo.connector.pusher;
  }

  /**
   * Listens for an event and registers a callback.
   */
  listen(channel: string, event: string, callback: Function) {
    return this.getChannel(channel).listen(event, callback);
  }

  /**
   * Listens for an event in the current user channel and registers a callback.
   */
  listenForUser(userId: string, events: any, source: any) {
    const channel = this.getChannel(`users.${userId}`);

    for (const event in events) {
      channel.subscription.bind(channel.eventFormatter.format(event), events[event], source);
    }
  }

  /**
   * Listens for an event in the given conversation and registers a callback.
   */
  listenForConversation(conversationId: string, events: any, source: any) {
    const channel = this.getChannel(`conversations.${conversationId}`);

    for (const event in events) {
      channel.subscription.bind(channel.eventFormatter.format(event), events[event], source);
    }
  }

  /**
   * Listens for an event in the given project and registers a callback.
   */
  listenForProject(projectId: string, events: any, source: any) {
    const channel = this.getChannel(`projects.${projectId}`);

    for (const event in events) {
      channel.subscription.bind(channel.eventFormatter.format(event), events[event], source);
    }
  }

  /**
   * Listens for an event for the current organization.
   */
  listenForOrganization(event: string, callback: Function) {
    this.listen(`organizations.b3256N`, event, callback);
  }

  /**
   * Retrieves a channel instance.
   */
  getChannel(channel: string) {
    return this.echo.private(channel);
  }

  /**
   * Unbinds selectAll callbacks from a given source.
   */
  stopListening(source: any) {
    this.getPusher().allChannels().forEach(channel => {
      channel.unbind(null, null, source);
    });
  }

  /**
   * Unbinds a callback from a channels event.
   */
  unlisten(channel: string, event: string, callback?: Function) {
    this.getPusher().channel('private-' + channel).callbacks.remove(event, callback);
  }
}

