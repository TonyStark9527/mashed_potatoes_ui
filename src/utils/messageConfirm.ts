import Swal, { SweetAlertIcon } from 'sweetalert2'
import { Dark } from 'quasar'

module MessageConfirm {

    export function confirm(text: string, confirmButtonText: string, callback: Function) {
        Swal.fire({
            text: text,
            showCancelButton: true,
            confirmButtonText: confirmButtonText || '确定',
            confirmButtonColor: '#26A69A',
            width: '20em',
            cancelButtonText: '取消',
            color: Dark.isActive ? '#fff' : '#000',
            background: Dark.isActive ? '#000' : '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                callback()
            }
        })
    }
}

export default MessageConfirm
