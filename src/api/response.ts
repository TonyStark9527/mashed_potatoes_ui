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
