import MESSAGE from '../config/message';
class ContentScript {
    /**
     * 权限校验方法
     * @param  {(string|regexp)} pattern 选项页填写的规则
     * @return {boolean} 是否校验通过
     */
    checkPermission(pattern) {
        var url = location.href;
        pattern = pattern.replace(/(?:^\s+)|(?:\s+$)/, '');
        if (pattern.match('/.*/')) {
            pattern = new RegExp(pattern.slice(1, pattern.length - 1));
            return pattern.test(url);
        }
        return url.indexOf(pattern) > -1;
    }

    /**
     * 注入runtimejs
     * @param {string} styleText legoStickyTool的css代码
     * @ignore
     */
    injectRuntimeJs(styleText) {
        let messageInput = document.createElement('input');
        messageInput.type = 'hidden';
        messageInput.id = 'extensionMessageJson';
        messageInput.value = JSON.stringify(MESSAGE);
        document.body.append(messageInput);

        let runtimeJs = document.createElement('script');
        runtimeJs.src = window.chrome.extension.getURL('contentScript/runtime.js');

        document.head.append(runtimeJs);
    }

    bindEvents() {
        // 和popup的交互
        window.chrome.runtime.onMessage.addListener(request => {
            switch (request.code) {
                case MESSAGE.INIT:
                    // 收到popup初始化请求，告诉页面初始化处理
                    window.postMessage({ code: MESSAGE.INIT }, '*');
                    break;

                case MESSAGE.SET_VALUE:
                    // 收到popup操作页面对象请求，向当前chrome tab 页面传递操作信息
                    window.postMessage({
                        code: MESSAGE.SET_VALUE_ON_PAGE,
                        name: request.name,
                        value: request.value,
                        index: request.index
                    }, '*');
                    break;

                default:
                    break;
            }
        }, false);

        // 与当前chrome tab页面的交互
        window.addEventListener('message', function (e) {
            if (e.data && e.data.code) {
                switch (e.data.code) {
                    case MESSAGE.NODATA_ON_PAGE:
                        window.chrome.runtime.sendMessage({
                            code: MESSAGE.NODATA
                        });
                        break;

                    case MESSAGE.RECEIVE_ERROR_ON_PAGE:
                        // 页面sdk操作失败消息处理
                        window.chrome.runtime.sendMessage({
                            code: MESSAGE.RECEIVE_ERROR,
                            message: e.data.message
                        });
                        break;

                    default:
                        break;
                }
            }
        });
    }

    async run() {
        // 获取插件权限from bg.js，注入runtime.js
        window.chrome.runtime.sendMessage({code: MESSAGE.GET_PERMISSION_RULES}, response => {
            if (!response) {
                return;
            }

            let permissions = response.permission.replace(/(\r\n)|\r|\n/g, ',').split(',');
            permissions.forEach(permission => {
                if (permission && this.checkPermission(permission)) {
                    window.chrome.runtime.sendMessage({code: MESSAGE.RECEIVE_PERMISSION});
                    this.bindEvents();
                    this.injectRuntimeJs();
                    return false;
                }
            });
        });
    }
}

let cs = new ContentScript();
cs.run();
