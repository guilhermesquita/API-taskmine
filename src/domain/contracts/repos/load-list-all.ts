import { HttpResponse } from "@/application/contracts"
import { List } from "@/domain/entities"

export interface LoadListAll {
    loadAll: (token: string) => Promise <LoadListAll.Result>
}

export namespace LoadListAll{
    export type Result = List[] | undefined | HttpResponse
}