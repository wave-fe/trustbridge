import {uuid, getDomain} from './utils';
export class Communicator {
    constructor({domain, target}) {
        this.origin = domain;
        this.w = target;
        this.callbackMap = {};

        window.addEventListener('message', e => {
            let origin = e.origin || e.originalEvent.origin;
            if (this.origin !== '*' && origin !== this.origin) {
                return;
            }
            let eventName = e.data.type;
            if (!eventName) {
                return;
            }
            let [name, token] = eventName.split(':');
            // console.log('receive:', name);
            let handlers = this.callbackMap[name] || [];
            if (token) {
                handlers = handlers.concat(this.callbackMap[eventName] || []);
            }
            if (handlers.length) {
                handlers.map(handler => handler(e.data.data, data => this.emit(eventName, data)));
            }
        }, false);
    }

    emit(name, options) {
        // console.log('emit:', name);
        this.w.postMessage({
            type: name,
            data: options
        }, this.origin);
    }

    on(name, callback) {
        this.callbackMap[name] = this.callbackMap[name] || [];
        this.callbackMap[name].push(callback);
    }

    once(name, callback) {
        this.callbackMap[name] = this.callbackMap[name] || [];
        let cb = (...args) => {
            this.callbackMap[name] = this.callbackMap[name].filter(item => item !== cb);
            callback(...args);
        };
        this.callbackMap[name].push(cb);
    }

    send(name, options, callback) {
        let token = uuid('xxxx');
        let eventName = name + ':' + token;
        this.once(eventName, callback);
        this.emit(eventName, options);
    }
}
