<template>
  <div id="mui-player" class="abp" ref="videoPlayer">
    <div id="comment-stage" class='container' style="z-index: 1 !important;height: 100%;width: 100%;"></div>
  </div>
</template>
<script setup>
import 'mui-player/dist/mui-player.min.css'
import MuiPlayer from 'mui-player'
import '@/custom/comment-core-library/dist/css/style.css'
import CommentManager from '@/custom/comment-core-library/dist/CommentCoreLibrary.js'
import Hls from 'hls.js'
import Flv from 'flv.js'
import {onMounted, ref} from "vue"

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
  src: {
    type: String,
    required: true
  },
  mediaSource: {
    type: String,
    required: false,
    default: 'default'
  }
})

let muiPlayer = ref(null)

const videoPlayer = ref(null)

onMounted(() => {

  let options = {
    container: '#mui-player',
    title: props.title,
    src: props.src,
    width: '100%',
    height: '100%',
    lang: 'zh-cn',
    autoFit: false,
    themeColor: '#26A69A',
    custom:{
      rightSidebar:[
        {
          slot:'HD', // 对应定义的 slot 值
          width:'200px' // 侧栏宽度，string | number
        }
      ],
      footerControls:[
        {
          slot:'nextMedia', // 对应定义的 slot 值
          position:'left', // 显示的位置，可选 left、right
          tooltip:'下一集', // 鼠标悬浮在控件上显示的文字提示
          oftenShow:false, // 是否常显示。默认为false，在 mobile 环境下竖屏状态下隐藏，pc环境判下视频容器小于500px时隐藏
          click:function(e) { // 按钮点击事件回调
            console.log('next media button click...');
          },
          style:{}, // 自定义添加控件样式
        },
      ],
      headControls:[
        {
          slot:'castScreen', // 对应定义的 slot 值
          click:function(e) { // 按钮点击事件回调
            console.log('cast screen button click...');
          },
          style:{}, // 自定义添加控件样式
        }
      ]
    }
  }

  switch (props.mediaSource) {
    case 'hls': {
      options.parse = {
        type: 'hls',
        loader: Hls,
        config: {
          debug: false
        }
      }
      break
    }
    case 'flv': {
      options.parse = {
        type: 'flv',
        loader: Flv,
        config: {
          debug: false
        }
      }
      break
    }
    default: break
  }

  muiPlayer.value = new MuiPlayer(options)

  let CM = new CommentManager(document.getElementById('comment-stage'))

  CM.init(); // 初始化弹幕管理器


  let danmakuData = [
    {"mode":1,"text":"请画出受力分析（10分）","stime":200,"size":25,"dur":7000,"color":0xffffff},
    {"mode":5,"text":"这风景太漂亮了吧~","stime":1000,"size":25,"dur":4000,"color":0xFF0000},
    {"mode":5,"text":"前方高能，建议反复观看！！","stime":1500,"size":25,"dur":4000,"color":0xFFFF00},
  ]
  CM.load(danmakuData) // 载入弹幕列表，

// 启动播放弹幕（在未启动状态下弹幕不会移动）
  CM.start()

  // 当前视频播放的时间节点
  let time = 0
  // 计时器
  let timer = null
  // 记录是否正在播放
  let isPlay = false

  setTimeout(() => {
    // 视频点击播放按钮监听
    videoPlayer.value?.children[1].children[0].children[0]?.addEventListener('play', function (event) {
      clearInterval(timer)
      timer = setInterval(() => {
        time += 1
        CM.time(time)
      }, 1)
      CM.start()
    })
    // 视频点击暂停按钮监听
    videoPlayer.value?.children[1].children[0].children[0]?.addEventListener('pause', function (event) {
      clearInterval(timer)
      CM.stop()
    })
    // 视频重新定位之前监听
    videoPlayer.value?.children[1].children[0].children[0]?.addEventListener('seeking', function (event) {
      clearInterval(timer)
    })
    // 视频重新定位之后监听
    videoPlayer.value?.children[1].children[0].children[0]?.addEventListener('seeked', function (event) {
      clearInterval(timer)
      time = this.currentTime
      CM.clear()
      CM.init()
      CM.load(danmakuData.filter(item => item.stime > time))
      CM.time(time)
      timer = setInterval(() => {
        time += 1
        CM.time(time)
      }, 1)
      CM.start(time)
    })
  }, 500)
})
</script>
