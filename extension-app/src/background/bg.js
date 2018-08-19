import MESSAGE from '../config/message';
class Main {
    bindEvents() {
        window.chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            switch (request.code) {
                case MESSAGE.GET_PERMISSION_RULES:
                    // define by your site address
                    if (!window.localStorage.getItem('extensionPermission')) {
                        window.localStorage.setItem('extensionPermission', '/https?:\\/\\/.*\\.github\\.com/');
                    }
                    sendResponse({ permission: window.localStorage.getItem('extensionPermission') });
                    break;
                case MESSAGE.RECEIVE_PERMISSION: // 授权
                    window.chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        window.chrome.pageAction.show(tabs[0].id);
                    });
                    break;
                default:
                    break;
            }
        }, false);
    }

    async run() {
        this.bindEvents();
    }
}

let main = new Main();
main.run();
