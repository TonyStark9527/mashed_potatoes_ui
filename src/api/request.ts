export type SimplePanel<T> = {
    show: boolean
    loading: boolean
    param: T
}

export type Panel<T, U> = {
    show: boolean
    loading: boolean
    param: T
    other: U
}
