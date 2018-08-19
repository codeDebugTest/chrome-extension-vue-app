/**
 * page data storage, api response data
 */
import MESSAGE from '../config/message';
import {sendMessage} from './common/util';

export default class AppModel {
    bindEvents() {
        window.chrome.runtime.onMessage.addListener((request) => {
            this.waitingMessage = false;
            switch (request.code) {
                case MESSAGE.NODATA:
                    this.redirect('/not_found');
                default:
                    break;
            }
        });
    }

    init() {
        sendMessage({code: MESSAGE.INIT});
        this.bindEvents();
    }
}
