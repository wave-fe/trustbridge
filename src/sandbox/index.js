import {Communicator} from '../communicator';
import {getDomain} from '../utils';

export default class SandBox {

    constructor() {
    }

    init(config, callback = function () {}) {
        this.communicator = new Communicator({
            domain: '*',
            target: window.top
        }); 

        let handlers = config.handlers || {};

        Object.keys(handlers).map(key => this.communicator.on(key, handlers[key]));

        this.communicator.emit('ready');

        callback();

    }
}
