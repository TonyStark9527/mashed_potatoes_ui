import {RadioOption, SelectOption} from "@/type/common";

export type FriendApply = {
    addPanel: boolean
    searchContent: string
    targetUsername: string
    targetClusterId: number | string
    comment: string
}

export type EditRemark = {
    friendId: number
    editRemarkLoading: boolean
    newRemark: string
}

export type EditCluster = {
    editPanel: boolean
}

export type EditUserCluster = {
    editPanel: boolean
    selectValue: string | number
    toSelectCluster: RadioOption[]
}

export type AddFriendApplyOther = {
    searchContent: string
    searchFriend: SelectOption[]
}
