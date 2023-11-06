export type UserDTO = {
    avatar: string
    createTime: string
    deleted: boolean
    email: string
    id: number
    lastLoginDate: string
    lastLoginIp: string
    nickname: string
    password: string
    phoneNumber: string
    sex: string
    status: string
    updateTime: string
    username: string
}

export type FriendMessageVO = {
    avatar: string
    contactId: number
    friendId: number
    friendUsername: string
    lastContactDateTime: string
    lastMessage: string
    lastSendAlias: string
    remark: string
    unReadMessageCount: number
}

export type MessageVO = {
    avatar: string
    content: string
    sendDateTime: string
    sent: boolean
}

export type FriendVO = {
    id: number
    friendUsername: string
    remark: string
    clusterId: number
    contactId: number
    avatar: string
    email: string
}

export type ClusterVO = {
    id: number
    clusterName: string
    opened: boolean
    onlineProportion: string
}

export type SimpleUserVO = {
    id: number
    username: string
    nickname: string
}

export type AddCluster = {
    clusterName: string
    opened: boolean
}

export type AddFriendApply = {
    clusterId: number | string
    comment: string
    targetUsername: string
}
