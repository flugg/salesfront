import * as Pusher from 'pusher-js';
import * as Echo from 'laravel-echo';

export class ConnectionRegistry {
    /**
     * The Laravel Echo instance.
     */
    private echo;

    /**
     * List of all services, and number of components using them
     * Also has the event
     * @type {Array}
     */
    serviceMap: any[];

    constructor() {
        this.serviceMap = [];
    }

    register(service: any, channel: string, event: string, callback: Function) {
        const result = this.serviceMap.find(entry => entry.service === service)
            .events.find(entry => entry.name === event);

        if (!result) {
            this.startListening(service, channel, event, callback);
        } else {
            result.listeners++;
        }
    }

    unregister(service: any, channel: string, event: string, callback: Function) {
        const result = this.serviceMap.find(entry => entry.service === service)
            .events.find(entry => entry.name === event);

        if (result.listeners > 1) {
            result.listeners--;
        } else {
            this.echo.connector.pusher.channel('private-' + channel).callbacks.remove(event, callback);
            // TODO remove event from serviceMap, lazy ~~~
        }
    }

    private startListening(service: any, channel: string, event: string, callback: Function) {
        this.echo.privateChannel(channel).listen(event, callback);

        const value = {
            service: service,
            channel: channel,
            events: [
                {
                    event: event,
                    callback: callback
                }
            ]
        };
        this.serviceMap.push(value);
    }
}
