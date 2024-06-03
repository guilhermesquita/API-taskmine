export interface EditUser{
    edit: (user: EditUser.Params) => Promise<EditUser.Result> 
}

export namespace EditUser{
    export type Params = {
        id: number
        name: string
        email: string
        password: string
    }
    export type Result = {
        id: number
        statusCode: number
        message: string
    }
}