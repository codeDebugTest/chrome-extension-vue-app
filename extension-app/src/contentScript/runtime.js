class RunTime {
    constructor() {
        let messageInput = document.getElementById('extensionMessageJson');
        this.MESSAGE = JSON.parse(messageInput.value);
        document.body.removeChild(messageInput);
    }x

    bindEvents() {
        window.addEventListener('message', e => {
            if (e.data && e.data.code) {
                switch (e.data.code) {
                    case this.MESSAGE.INIT:
                        // 初始化处理 bala bala
                        let nodata = true;
                        if (nodata) {
                            window.postMessage({
                                code: this.MESSAGE.NODATA_ON_PAGE
                            }, '*');
                        }

                        break;
                    case this.MESSAGE.SET_VALUE_ON_PAGE:
                        let {name, value} = e.data;
                        if (name != null && value) {
                            // bala bala 处理操作

                            try {
                                // send success event
                            }
                            catch (err) {
                                window.postMessage({
                                    code: this.MESSAGE.RECEIVE_ERROR_ON_PAGE,
                                    message: err.message
                                }, '*');
                            }

                            // 还可以 send error message
                            /*
                                window.postMessage({
                                //     code: this.MESSAGE.RECEIVE_ERROR_ON_PAGE,
                                //     message: '当前页面错误 :-('
                                // }, '*');
                            */
                        }
                        break;
                    default:
                        break;
                }
            }
        });
    }
}

let rt = new RunTime();
rt.bindEvents();
