import {Notify} from "quasar"

module NotifyTip {

    export function success(message: string) {
        Notify.create({
            type: 'positive',
            position: 'bottom-right',
            message: message,
            timeout: 3000,
        })
    }

    export function error(message: string) {
        Notify.create({
            type: 'negative',
            position: 'bottom-right',
            message: message,
            timeout: 3000
        })
    }

    export function warn(message: string) {
        Notify.create({
            type: 'warning',
            position: 'bottom-right',
            message: message,
            timeout: 3000
        })
    }

    export function info(message: string) {
        Notify.create({
            type: 'info',
            position: 'bottom-right',
            message: message,
            timeout: 3000
        })
    }
}

export default NotifyTip
