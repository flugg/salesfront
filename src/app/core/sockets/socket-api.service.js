"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Pusher = require("pusher-js");
var Echo = require("laravel-echo");
var SocketApiService = (function () {
    /**
     * Constructs the service.
     */
    function SocketApiService(tokenService, snackBar) {
        this.tokenService = tokenService;
        this.snackBar = snackBar;
        this.connect();
    }
    /**
     * Connects to Pusher using Laravel Echo.
     */
    SocketApiService.prototype.connect = function () {
        window['Pusher'] = Pusher;
        this.echo = new Echo({
            auth: { headers: { 'Authorization': "Bearer " + this.tokenService.get() } },
            authEndpoint: 'http://api.vendumo.com/broadcasting/auth',
            broadcaster: 'pusher',
            key: '22dde1271dab2d4b1da0',
            secret: '4881a3a6d6bec748fa58',
            cluster: 'eu',
            encrypted: true,
            namespace: ''
        });
        this.listenForDisconnects();
    };
    /**
     * Listens for disconnects from Pusher.
     */
    SocketApiService.prototype.listenForDisconnects = function () {
        var _this = this;
        this.getPusher().connection.bind('disconnected', function () { return _this.handleDisconnect(); });
        this.getPusher().connection.bind('unavailable', function () { return _this.handleDisconnect(); });
        this.getPusher().connection.bind('error', function (error) { return _this.handleDisconnect(); });
        this.getPusher().connection.bind('failed', function (error) { return _this.handleDisconnect(); });
    };
    /**
     * Handles a disconnection from Pusher.
     */
    SocketApiService.prototype.handleDisconnect = function () {
        var _this = this;
        var snackBar = this.snackBar.open('Disconnected', 'Reconnect');
        snackBar.onAction().subscribe(function () {
            snackBar.dismiss();
            _this.echo.connector.connect();
            _this.snackBar.open('Reconnecting....');
        });
        this.getPusher().connection.bind('connected', function () {
            _this.snackBar.open('Connected', null, { duration: 3000 });
            _this.getPusher().connection.unbind('connected');
        });
    };
    /**
     * Retrieves the Pusher instance from Laravel Echo.
     */
    SocketApiService.prototype.getPusher = function () {
        return this.echo.connector.pusher;
    };
    /**
     * Listens for an event and registers a callback.
     */
    SocketApiService.prototype.listen = function (channel, event, callback) {
        return this.getChannel(channel).listen(event, callback);
    };
    /**
     * Listens for an event in the current user channel and registers a callback.
     */
    SocketApiService.prototype.listenForUser = function (userId, events, source) {
        var channel = this.getChannel("users." + userId);
        for (var event_1 in events) {
            channel.subscription.bind(channel.eventFormatter.format(event_1), events[event_1], source);
        }
    };
    /**
     * Listens for an event in the given conversation and registers a callback.
     */
    SocketApiService.prototype.listenForConversation = function (conversationId, events, source) {
        var channel = this.getChannel("conversations." + conversationId);
        for (var event_2 in events) {
            channel.subscription.bind(channel.eventFormatter.format(event_2), events[event_2], source);
        }
    };
    /**
     * Listens for an event in the given project and registers a callback.
     */
    SocketApiService.prototype.listenForProject = function (projectId, events, source) {
        var channel = this.getChannel("projects." + projectId);
        for (var event_3 in events) {
            channel.subscription.bind(channel.eventFormatter.format(event_3), events[event_3], source);
        }
    };
    /**
     * Listens for an event for the current organization.
     */
    SocketApiService.prototype.listenForOrganization = function (event, callback) {
        this.listen("organizations.b3256N", event, callback);
    };
    /**
     * Retrieves a channel instance.
     */
    SocketApiService.prototype.getChannel = function (channel) {
        return this.echo.private(channel);
    };
    /**
     * Unbinds all callbacks from a given source.
     */
    SocketApiService.prototype.stopListening = function (source) {
        this.getPusher().allChannels().forEach(function (channel) {
            channel.unbind(null, null, source);
        });
    };
    /**
     * Unbinds a callback from a channels event.
     */
    SocketApiService.prototype.unlisten = function (channel, event, callback) {
        this.getPusher().channel('private-' + channel).callbacks.remove(event, callback);
    };
    return SocketApiService;
}());
SocketApiService = __decorate([
    core_1.Injectable()
], SocketApiService);
exports.SocketApiService = SocketApiService;
