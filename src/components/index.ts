import {App} from 'vue'
import draggable from "vuedraggable"
import markdownEditor from "@/components/MarkdownEditor.vue"
import videoPlayer from "@/components/VideoPlayer.vue"

// 使用该方法为了确保webstorm浏览器不标记无法识别的html标签
export default {
    install(Vue: App) {
        Vue.component('draggable', draggable)
        Vue.component('markdown-editor', markdownEditor)
        Vue.component('video-player', videoPlayer)
    }
}
