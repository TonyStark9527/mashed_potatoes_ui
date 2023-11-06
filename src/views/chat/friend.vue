<template>
  <div class="q-gutter-none full-height full-width column no-wrap">

    <!-- 按钮组 -->
    <q-btn-group class="row text-primary no-shadow" spread stretch square style="height: 60px">
      <q-btn label="添加好友" icon="person_add" @click="addFriendApplyPanel.show = true"/>
      <q-btn label="新建分组" icon="diversity_3" @click="addClusterPanel.show = true"/>
    </q-btn-group>

    <q-separator/>

    <!-- 搜索好友 -->
    <q-input square standout="bg-primary text-white" v-model="text" class="row" label="搜索好友">
      <template v-slot:prepend>
        <q-icon name="person_search"/>
      </template>
      <template v-slot:append>
        <q-icon v-if="text === ''" name="search"/>
        <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''"/>
      </template>
    </q-input>

    <!-- 分组用户 -->
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
                        <q-input :loading="editRemark.editRemarkLoading" standout="bg-primary text-white" label="请输入好友备注" v-if="friend.id === editRemark.friendId" v-model="editRemark.newRemark">
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
                                @click="editRemark.friendId = 0"
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

                          <q-item clickable v-close-popup @click="userClusterEdit(element.major.id, friend.friendUsername)">
                            <q-item-section>
                              <q-item-label>分组调整</q-item-label>
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

  <!-- 添加好友弹框 -->
  <q-dialog v-model="addFriendApplyPanel.show">
    <q-card>
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">添加好友</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input standout="bg-primary text-white" label="搜索用户" v-model="addFriendApplyPanel.other.searchContent">
            <template v-slot:prepend>
              <q-icon name="person_search" />
            </template>
            <template v-slot:append>
              <q-btn flat round dense icon="search" @click="searchUser"/>
            </template>
          </q-input>
          <q-select table-colspan="2" standout="bg-primary text-white" :options="addFriendApplyPanel.other.searchFriend" label="选择用户" v-model="addFriendApplyPanel.param.targetUsername" emit-value map-options>
            <template v-slot:prepend>
              <q-icon name="how_to_reg" />
            </template>
          </q-select>
          <q-select table-colspan="2" standout="bg-primary text-white" :options="ownerCluster" label="选择用户" v-model="addFriendApplyPanel.param.clusterId" emit-value map-options>
            <template v-slot:prepend>
              <q-icon name="diversity_2" />
            </template>
          </q-select>
          <q-input standout="bg-primary text-white"
                   v-model="addFriendApplyPanel.param.comment"
                   type="textarea"
                   label="验证信息"
                   autogrow>
            <template v-slot:prepend>
              <q-icon name="maps_ugc" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn unelevated color="primary" label="取 消" :loading="addFriendApplyPanel.loading" v-close-popup/>
        <q-btn unelevated color="primary" label="发 送" :loading="addFriendApplyPanel.loading" @click="addNewFriend"/>
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

  <!-- 编辑好友分组 -->
  <q-dialog v-model="editUserCluster.editPanel">
    <q-card>
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">选择分组</div>
      </q-card-section>

      <q-card-section>
        <q-option-group :options="editUserCluster.toSelectCluster" v-model="editUserCluster.selectValue"/>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn unelevated color="primary" label="取 消" v-close-popup/>
        <q-btn unelevated color="primary" label="保 存"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- 添加分组弹框 -->
  <q-dialog v-model="addClusterPanel.show">
    <q-card>
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">添加分组</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input standout="bg-primary text-white" label="分组名" v-model="addClusterPanel.param.clusterName">
            <template v-slot:prepend>
              <q-icon name="diversity_2" />
            </template>
          </q-input>
          <q-toggle
              v-model="addClusterPanel.param.opened"
              color="primary"
              label="是否展开"
              checked-icon="check"
              unchecked-icon="clear"
          />
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn unelevated color="primary" label="取 消" v-close-popup/>
        <q-btn unelevated color="primary" label="新 增" @click="addNewCluster"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import notify from "@/utils/notify"
import confirm from "@/utils/confirm"
import {onBeforeMount, onMounted, reactive, ref} from "vue"
import {AddFriendApplyOther, EditCluster, EditRemark, EditUserCluster, FriendApply} from "@/type/chat/friend"
import api from "@/api/axios"
import {Page, ResultResponse, TreeDTO} from "@/api/response"
import {Panel, SimplePanel} from "@/api/request"
import {AddCluster, AddFriendApply, ClusterVO, FriendVO, SimpleUserVO} from "@/api/entity"
import {RadioOption, SelectOption} from "@/type/common";
import {userStore} from "@/store/userStore";

const state = reactive({
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  list: [
    { name: "www.itxst.com", id: 0 },
    { name: "www.baidu.com", id: 1 },
    { name: "www.google.com", id: 2 },
  ],
})

const onStart = () => {
  console.log("开始拖拽");
}

//拖拽结束的事件
const onEnd = () => {
  console.log(clusterAndFriendData);
}

const emits = defineEmits(['emitChildren'])

let text = ref<string>('')

let ownerCluster = ref<SelectOption[]>([])

let editCluster = ref<EditCluster>({
  editPanel: false
})

let editUserCluster = ref<EditUserCluster>({
  editPanel: false,
  selectValue: '',
  toSelectCluster: []
})

let addFriendApplyPanel = ref<Panel<AddFriendApply, AddFriendApplyOther>>({
  show: false,
  loading: false,
  param: {
    clusterId: '',
    comment: '请求添加你为好友',
    targetUsername: ''
  },
  other: {
    searchContent: '',
    searchFriend: []
  }
})

// 新建分组对象
let addClusterPanel = ref<SimplePanel<AddCluster>>({
  show: false,
  loading: false,
  param: {
    clusterName: '',
    opened: false
  }
})

// 编辑备注
let editRemark = ref<EditRemark>({
  friendId: 0,
  editRemarkLoading: false,
  newRemark: ''
})

// let clusterAndFriendData = reactive<TreeDTO<ClusterVO, FriendVO>[]>([
//   {
//     major: {
//       id: 1,
//       clusterName: '特别关心',
//       opened: true,
//       onlineProportion: ''
//     },
//     children: [
//       {
//         id: 1,
//         friendUsername: 'wwk',
//         remark: '武文康',
//         clusterId: 1,
//         contactId: 1,
//         avatar: '',
//         email: 'wwk981124@gmail.com'
//       },
//       {
//         id: 3,
//         friendUsername: 'tony',
//         remark: '托尼',
//         clusterId: 1,
//         contactId: 2,
//         avatar: '',
//         email: 'wwk981124@gmail.com'
//       }
//     ]
//   },
//   {
//     major: {
//       id: 2,
//       clusterName: '默认分组1',
//       opened: true,
//       onlineProportion: ''
//     },
//     children: []
//   },
//   {
//     major: {
//       id: 3,
//       clusterName: '默认分组2',
//       opened: true,
//       onlineProportion: ''
//     },
//     children: []
//   },
//   {
//     major: {
//       id: 4,
//       clusterName: '默认分组3',
//       opened: true,
//       onlineProportion: ''
//     },
//     children: []
//   }
// ])
let clusterAndFriendData = reactive<TreeDTO<ClusterVO, FriendVO>[]>([])

initClusterAndFriend()

function initClusterAndFriend() {
  api.get<ResultResponse<TreeDTO<ClusterVO, FriendVO>[]>>('chat/friend/cluster/friends').then(clusterAndFriend => {
    // clusterAndFriendData = clusterAndFriend.data.result
    clusterAndFriend.data.result.forEach(item => {
      clusterAndFriendData.push(item)
    })
    clusterAndFriendData.forEach(item => {
      ownerCluster.value.push({
        label: item.major.clusterName,
        value: item.major.id
      })
    })
  })
}

function searchUser() {
  api.get<ResultResponse<Page<SimpleUserVO>>>('user/user/users/'+ addFriendApplyPanel.value.other.searchContent +'/page').then(res => {
    let users = res.data.result.content
    addFriendApplyPanel.value.other.searchFriend = []
    users.forEach(item => {
      addFriendApplyPanel.value.other.searchFriend.push({
        label: item.nickname,
        value: item.username
      })
    })
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

/**
 * 点击修改备注按钮
 * @param friend
 */
function remarkEdit(friend: FriendVO) {
  editRemark.value.friendId = friend.id
}

/**
 * 点击分组调整按钮
 * @param clusterId
 * @param friendUsername
 */
function userClusterEdit(clusterId: number, friendUsername: string) {
  editUserCluster.value.selectValue = clusterId
  let toSelectCluster:RadioOption[] = []
  clusterAndFriendData.forEach(item => {
    toSelectCluster.push({
      label: item.major.clusterName,
      value: item.major.id
    })
  })
  editUserCluster.value.toSelectCluster = toSelectCluster
  editUserCluster.value.editPanel = true
}

/**
 * 提交修改备注
 */
function submitEditMark() {
  editRemark.value.editRemarkLoading = true
  api.put<ResultResponse<boolean>>('/friend/friend/' + editRemark.value.friendId + '/remark/' + editRemark.value.newRemark).then(result => {
    if (result.data.result) {
      clusterAndFriendData.forEach(item => {
        if (item.children) {
          item.children.forEach(friend => {
            if (friend.id === editRemark.value.friendId) {
              friend.remark = editRemark.value.newRemark
            }
          })
        }
      })
    } else {
      notify.error('修改好友备注失败')
    }
    editRemark.value.editRemarkLoading = false
    editRemark.value.friendId = 0
    editRemark.value.newRemark = ''
  })
}

function click() {
  notify.info('我被点击了')
}

/**
 * 点击聊天
 * @param friend
 */
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

/**
 * 点击新增分组
 */
function addNewCluster() {
  addClusterPanel.value.loading = true
  api.post<ResultResponse<boolean>>('chat/cluster/add', addClusterPanel.value.param).then(res => {
    if (res.data.result) {
      addClusterPanel.value.loading = false
      addClusterPanel.value.show = false
      addClusterPanel.value.param.clusterName = ''
      addClusterPanel.value.param.opened = false
      notify.success('新建分组成功！')
      initClusterAndFriend()
    } else {
      addClusterPanel.value.loading = false
      notify.error('新建分组失败！')
    }
  })
}

function addNewFriend() {
  addFriendApplyPanel.value.loading = true
  api.post<ResultResponse<boolean>>('chat/friend_apply/add', addFriendApplyPanel.value.param).then(res => {
    if (res.data.result) {
      // todo 处理成功
      addFriendApplyPanel.value.loading = false
      addFriendApplyPanel.value.param.clusterId = ''
      addFriendApplyPanel.value.param.targetUsername = ''
      addFriendApplyPanel.value.other.searchContent = ''
      addFriendApplyPanel.value.other.searchFriend = []
      addFriendApplyPanel.value.show = false
      notify.success('发送好友申请成功！')
    } else {
      addFriendApplyPanel.value.loading = true
      notify.error('发送好友申请失败！')
    }
  })
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
