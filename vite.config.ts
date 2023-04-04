import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {quasar, transformAssetUrls} from "@quasar/vite-plugin"
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        vue({
            template: {transformAssetUrls}
        }),
        quasar({
            sassVariables: 'src/quasar-variables.sass'
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    server: {
        host: true // 开启网络监听，可以通过ip端口进行访问
    }
})
