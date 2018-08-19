export function sendMessage(data, cb) {
    window.chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        window.chrome.tabs.sendMessage(tabs[0].id, data, cb);
    });
};
