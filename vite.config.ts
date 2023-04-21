import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {quasar, transformAssetUrls} from "@quasar/vite-plugin"
import {resolve} from 'path'

// 去除build之后的文件名含有特殊字符
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

// https://vitejs.dev/config/
export default defineConfig({
    base: '/mashed_potatoes_ui/',
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
    build:{
        rollupOptions: {
            output: {
                sanitizeFileName(name: string) {
                    const match = DRIVE_LETTER_REGEX.exec(name)
                    const driveLetter = match ? match[0] : ''
                    return (
                        driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
                    )
                }
            }
        }
    },
    server: {
        host: true // 开启网络监听，可以通过ip端口进行访问
    }
})
