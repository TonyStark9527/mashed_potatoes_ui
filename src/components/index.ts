import {App} from 'vue'
import draggable from "vuedraggable"

// 使用该方法为了确保webstorm浏览器不标记无法识别的html标签
export default {
    install(Vue: App) {
        Vue.component('draggable', draggable)
    }
}
