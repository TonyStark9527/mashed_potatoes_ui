export interface ResultResponse<T> {
    code: string
    message: string
    result: T
}

export type Page<T> = {
    content: T[]
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    pageable: pageable
    size: number
    sort: sort
    totalElements: number
    totalPages: number
}

export type TreeDTO<T, E> = {
    major: T
    children: E[]
}

type pageable = {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: sort
    unpaged: number
}

type sort = {
    empty: boolean
    sorted: boolean
    unsorted: boolean
}

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
