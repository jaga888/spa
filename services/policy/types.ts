export interface PolicyList{
    id: number,
    name: string,
    identifier: string,
    description: string,
    pivot: PolicyPivot
}

export interface PolicyPivot{
    exclude: boolean
}
