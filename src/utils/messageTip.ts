import Swal, { SweetAlertIcon } from 'sweetalert2'
import { Dark } from 'quasar'

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

/**
 * 消息提示模块
 */
module MessageTip {

    /**
     * 成功提示
     * @param text string
     */
    export function success(text: string) {
        tip('success', text)
    }

    /**
     * 失败提示
     * @param text string
     */
    export function error(text: string) {
        tip('error', text)
    }

    /**
     * 警告提示
     * @param text string
     */
    export function warn(text: string) {
        tip('warning', text)
    }

    /**
     * 描述提示
     * @param text string
     */
    export function info(text: string) {
        tip('info', text)
    }

    /**
     * 问题提示
     * @param text string
     */
    export function question(text: string) {
        tip('question', text)
    }

    /**
     * 提示
     * @param icon SweetAlertIcon
     * @param text string
     */
    function tip(icon: SweetAlertIcon, text: string) {
        Toast.fire({
            icon: icon,
            text: text,
            color: Dark.isActive ? '#fff' : '#000',
            background: Dark.isActive ? '#000' : '#fff'
        })
    }
}

export default MessageTip
