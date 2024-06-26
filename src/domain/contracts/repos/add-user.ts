export interface AddUser{
    add: (user: AddUser.Params) => Promise<AddUser.Result> 
}

export namespace AddUser{
    export type Params = {
        name: string
        email: string
        password: string
    }
    export type Result = {
        id: number
        statusCode: number
        message: string
        token: string
    }
}