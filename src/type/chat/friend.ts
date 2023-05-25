export type FriendApply = {
    addPanel: boolean
    targetUsername: string
    comment: string
}

export type EditRemark = {
    friendUsername: string
    editRemarkLoading: boolean
    newRemark: string
}

export type EditCluster = {
    editPanel: boolean
}
