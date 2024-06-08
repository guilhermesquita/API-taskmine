import { HttpResponse } from "@/application/contracts"

export interface AddList{
    add: (list: AddList.Params) => Promise<AddList.Result | HttpResponse>
}

export namespace AddList{
    export type Params = {
        name: string
        fr_user: number
        token: string
    }
    export type Result = {
        id: string | number
        statusCode: number
        message: string
    }
}