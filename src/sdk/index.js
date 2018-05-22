import {UNREADY, READY, DESTROYED} from '../life';
import {Communicator} from '../communicator';

import {getDomain, createIframe, destroyeIframe} from '../utils';

export default class TrustBridge {

    constructor() {
        this.lifeCycle = UNREADY;
    }

    init(config, callback = function () {}) {
        let {
            url,
        } = config;

        this.lifeCycle = UNREADY;

        let iframe = createIframe(url);

        this.communicator = new Communicator({
            domain: getDomain(url),
            target: iframe.contentWindow
        }); 

        this.communicator.on('ready', () => {

            this.lifeCycle = READY;

            callback();

        });
    }

    invork(name, options, callback) {
        this.communicator.send(name, options, callback);
    }

}
