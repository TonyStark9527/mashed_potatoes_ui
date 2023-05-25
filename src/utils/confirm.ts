import {Dialog} from "quasar"

module ConfirmTip {
    export function confirm(message: string,
                            ok: Function,
                            cancel: Function | undefined = undefined,
                            dismiss: Function | undefined = undefined,
                            title: string = '请确认') {
        Dialog.create({
            title: title,
            message: message,
            ok: {
                color: 'primary'
            },
            cancel: {
                color: 'negative'
            },
            persistent: true
        }).onOk(() => {
            ok()
        }).onCancel(() => {
            if (cancel) {
                cancel()
            }
        }).onDismiss(() => {
            if (dismiss) {
                dismiss()
            }
        })
    }
}

export default ConfirmTip
