import NotifyTip from "@/utils/notify"

module webSocketUtil {
    export function create(url: string, messageCallBack: Function) {
        if ('WebSocket' in window) {
            let webSocket = new WebSocket(url)
            webSocket.onerror = function (event) {
                NotifyTip.error('websocket连接失败！')
            }
            webSocket.onopen = function (event) {
                NotifyTip.success('websocket连接成功！')
            }
            webSocket.onmessage = function (messageEvent: MessageEvent) {
                messageCallBack(messageEvent)
            }
            webSocket.onclose = function (closeEvent) {
                NotifyTip.success('websocket关闭成功！')
            }
            window.onbeforeunload = function () {
                closeWebSocket(webSocket)
            }
            return webSocket
        } else {
            NotifyTip.warn('该浏览器不支持WebSocket!')
            return null
        }
    }

    function closeWebSocket(webSocket: WebSocket) {
        webSocket.close()
    }
}

export default webSocketUtil
