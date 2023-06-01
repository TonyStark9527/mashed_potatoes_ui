<template>
  <div class="q-gutter-none full-height full-width column no-wrap">

    <q-btn-group class="row text-primary no-shadow" spread stretch square style="height: 60px">
      <q-btn label="添加好友" icon="person_add" @click="addFriend"/>
      <q-btn label="分组管理" icon="diversity_3" @click="openFalse"/>
    </q-btn-group>

    <q-separator/>

    <q-input standout="bg-primary text-white" v-model="text" class="row" label="搜索好友">
      <template v-slot:prepend>
        <q-icon name="person_search"/>
      </template>
      <template v-slot:append>
        <q-icon v-if="text === ''" name="search"/>
        <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''"/>
      </template>
    </q-input>

    <q-scroll-area class="full-width full-height q-pa-xs row">
      <q-list class="rounded-borders full-height">
        <draggable
            :list="clusterAndFriendData"
            handle=".mover"
            ghost-class="ghost"
            chosen-class="chosenClass"
            animation="300"
            @start="onStart"
            @end="onEnd"
            item-key="id">
          <template v-slot:item="{ element }">
            <q-expansion-item
                :default-opened="element.major.opened"
                expand-separator
                icon="diversity_2"
                :label="element.major.clusterName"
                header-class="text-primary"
            >
              <template v-slot:header>
                <q-item-section avatar>
                  <q-icon name="diversity_2"/>
                </q-item-section>
                <q-item-section>
                  {{element.major.clusterName}}
                </q-item-section>
                <q-item-section side>
                  <div class="row items-center">
                    <q-icon name="control_camera" color="primary mover" size="24px" />
<!--                    <q-icon name="star" color="red" size="xs" />-->
<!--                    <q-icon name="star" color="red" size="xs" />-->
                  </div>
                </q-item-section>
              </template>
              <q-list bordered style="border-top: 0; border-left: 0; border-right: 0">
                <template v-if="element.children.length > 0" v-for="(friend, index) in element.children">
                  <q-item class="q-my-sm">
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="friend.avatar" alt="">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>
                        <q-input :loading="editRemark.editRemarkLoading" standout="bg-teal text-white" label="请输入好友备注" v-if="friend.friendUsername === editRemark.friendUsername" v-model="editRemark.newRemark">
                          <template v-slot:append>
                            <q-icon
                                v-if="!editRemark.editRemarkLoading"
                                name="check_circle_outline"
                                class="cursor-pointer"
                                @click="submitEditMark"
                            />
                            <q-icon
                                v-if="!editRemark.editRemarkLoading"
                                name="highlight_off"
                                class="cursor-pointer"
                                @click="editRemark.friendUsername = ''"
                            />
                          </template>
                        </q-input>
                        <span v-else>{{ friend.remark }}</span>
                      </q-item-label>
                      <q-item-label caption lines="1">{{ friend.email }}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-btn-dropdown class="friend-tool" size="xs" rounded color="primary">
                        <template v-slot:label>

                        </template>
                        <q-list>
                          <q-item clickable v-close-popup @click="chat(friend)">
                            <q-item-section>
                              <q-item-label>聊天</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-item clickable v-close-popup @click="remarkEdit(friend)">
                            <q-item-section>
                              <q-item-label>修改备注</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-item class="text-red" clickable v-close-popup @click="deleteFriend">
                            <q-item-section>
                              <q-item-label>删除</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-btn-dropdown>
                    </q-item-section>
                  </q-item>
                  <q-separator v-if="index !== element.children.length - 1" inset="item" />
                </template>
              </q-list>
            </q-expansion-item>
          </template>
        </draggable>
      </q-list>
    </q-scroll-area>
  </div>
  <q-dialog v-model="friendApply.addPanel">
    <q-card>
      <q-card-section>
        <div class="text-h6">添加好友</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-select standout="bg-teal text-white" :options="['google', 'baidu', 'biying']" label="用户名" v-model="friendApply.targetUsername"/>
          <q-input
              v-model="friendApply.comment"
              filled
              type="textarea"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn unelevated color="primary" label="取 消" v-close-popup/>
        <q-btn unelevated color="primary" label="保 存"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="editCluster.editPanel">
    <q-card>
      <q-card-section>
        <div class="text-h6">编辑分组</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <draggable
            :list="state.list"
            ghost-class="ghost"
            chosen-class="chosenClass"
            animation="300"
            @start="onStart"
            @end="onEnd"
            item-key="id"
        >
          <template v-slot:item="{ element }" :key="element.major.id">
            <q-item>
              <q-item-section avatar top>
                <q-icon name="account_tree" color="black" size="34px" />
              </q-item-section>

              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">GitHub</q-item-label>
              </q-item-section>

              <q-item-section top>
                <q-item-label lines="1">
                  <span class="text-weight-medium">[quasarframework/quasar]</span>
                  <span class="text-grey-8"> - GitHub repository</span>
                </q-item-label>
                <q-item-label caption lines="1">
                  @rstoenescu in #1: > The build system
                </q-item-label>
                <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                  <span class="cursor-pointer">Open in GitHub</span>
                </q-item-label>
              </q-item-section>

              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
                  <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
                  <q-btn size="12px" flat dense round icon="more_vert" />
                </div>
              </q-item-section>
            </q-item>
          </template>
        </draggable>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn unelevated color="primary" label="取 消" v-close-popup/>
        <q-btn unelevated color="primary" label="保 存"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import notify from "@/utils/notify"
import confirm from "@/utils/confirm"
import {reactive, ref} from "vue"
import {EditCluster, EditRemark, FriendApply} from "@/type/chat/friend"
import api from "@/api/axios"
import {ClusterVO, FriendVO, ResultResponse, TreeDTO} from "@/api/response"

const state = reactive({
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  list: [
    { name: "www.itxst.com", id: 0 },
    { name: "www.baidu.com", id: 1 },
    { name: "www.google.com", id: 2 },
  ],
});

const onStart = () => {
  console.log("开始拖拽");
};

//拖拽结束的事件
const onEnd = () => {
  console.log(clusterAndFriendData);
};



const friendApply = ref<FriendApply>({
  addPanel: false,
  targetUsername: '',
  comment: ''
})

const emits = defineEmits(['emitChildren'])

let text = ref<string>('')

let editCluster = ref<EditCluster>({
  editPanel: false
})

// 编辑备注
let editRemark = ref<EditRemark>({
  friendUsername: '',
  editRemarkLoading: false,
  newRemark: ''
})

let clusterAndFriendData = reactive<TreeDTO<ClusterVO, FriendVO>[]>([
  {
    major: {
      id: 1,
      clusterName: '特别关心',
      opened: true,
      onlineProportion: ''
    },
    children: [
      {
        id: 1,
        friendUsername: 'wwk',
        remark: '武文康',
        clusterId: 1,
        contactId: 1,
        avatar: '',
        email: 'wwk981124@gmail.com'
      },
      {
        id: 3,
        friendUsername: 'tony',
        remark: '托尼',
        clusterId: 1,
        contactId: 2,
        avatar: '',
        email: 'wwk981124@gmail.com'
      }
    ]
  },
  {
    major: {
      id: 2,
      clusterName: '默认分组1',
      opened: true,
      onlineProportion: ''
    },
    children: []
  },
  {
    major: {
      id: 3,
      clusterName: '默认分组2',
      opened: true,
      onlineProportion: ''
    },
    children: []
  },
  {
    major: {
      id: 4,
      clusterName: '默认分组3',
      opened: true,
      onlineProportion: ''
    },
    children: []
  }
])

function initClusterAndFriend() {
  api.get<ResultResponse<TreeDTO<ClusterVO, FriendVO>[]>>('').then(clusterAndFriend => {
    clusterAndFriendData = clusterAndFriend.data.result
  })
}

function openFalse() {
  // clusterAndFriendData.push({
  //   major: {
  //     id: 5,
  //     clusterName: '默认分组4',
  //     opened: false,
  //     onlineProportion: ''
  //   },
  //   children: []
  // })
  clusterAndFriendData.forEach(item => {
    if (item.major.id === 1) {
      item.major.clusterName = '你说啥'
    }
  })
  console.log(clusterAndFriendData)
}

function remarkEdit(friend: FriendVO) {
  editRemark.value.friendUsername = friend.friendUsername
}

function submitEditMark() {
  // TODO 调用修改备注接口
  editRemark.value.editRemarkLoading = true
}

function cancelEditRemark() {

}

function addFriend() {
  friendApply.value.addPanel = true
}

function click() {
  notify.info('我被点击了')
}

function chat(friend: FriendVO) {
  let params = {
    functionName: 'selectContact',
    data: {
      contactId: friend.contactId,
      friendUsername: friend.friendUsername
    }
  }
  emits('emitChildren', params)
}

function deleteFriend() {
  confirm.confirm('是否删除该好友', function() {
    // TODO 调用接口删除好友
    notify.success('已成功删除')
  } )
}
</script>

<style lang="sass">
.friend-tool
  padding: 0
  width: 24px
  height: 24px

.mover
  cursor: move
</style>
