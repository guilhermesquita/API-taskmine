export interface CheckUserById{
    check: (id: CheckUserById.Params) => Promise<CheckUserById.Result>
}

export namespace CheckUserById{
    export type Params = number
    export type Result = boolean | undefined
}