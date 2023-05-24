<template>
  <div class="q-gutter-none full-height full-width column no-wrap">

    <q-btn-group class="row text-primary no-shadow" spread stretch square style="height: 60px">
      <q-btn label="添加好友" icon="person_add" @click="addFriend"/>
      <q-btn label="分组管理" icon="diversity_3"/>
    </q-btn-group>

    <q-separator/>

    <q-input standout="bg-teal text-white" v-model="text" class="row" label="搜索好友">
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
        <q-expansion-item
            v-for="cluster in clusterAndFriendData"
            :default-opened="cluster.major.opened"
            expand-separator
            icon="diversity_2"
            :label="cluster.major.clusterName"
            header-class="text-primary"
        >
          <q-list bordered style="border-top: 0; border-left: 0; border-right: 0">
            <template v-if="cluster.children.length > 0" v-for="(friend, index) in cluster.children">
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
              <q-separator v-if="index !== cluster.children.length - 1" inset="item" />
            </template>
          </q-list>
        </q-expansion-item>
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
        <q-btn unelevated color="primary" label="登 录"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import notify from "@/utils/notify"
import confirm from "@/utils/confirm"
import {ref} from "vue"
import {EditRemark, FriendApply} from "@/type/chat/friend"
import api from "@/api/axios"
import {ClusterVO, FriendVO, ResultResponse, TreeDTO} from "@/api/response"

const friendApply = ref<FriendApply>({
  addPanel: false,
  targetUsername: '',
  comment: ''
})

const emits = defineEmits(['emitChildren'])

let text = ref<string>('')

// 编辑备注
let editRemark = ref<EditRemark>({
  friendUsername: '',
  editRemarkLoading: false,
  newRemark: ''
})

let clusterAndFriendData = ref<TreeDTO<ClusterVO, FriendVO>[]>([
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
  }
])

function initClusterAndFriend() {
  api.get<ResultResponse<TreeDTO<ClusterVO, FriendVO>[]>>('').then(clusterAndFriend => {
    clusterAndFriendData.value = clusterAndFriend.data.result
  })
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
</style>
