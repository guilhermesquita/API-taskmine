import { List } from "@/domain/entities"

export interface LoadListAll {
    loadAll: () => Promise <LoadListAll.Result>
}

export namespace LoadListAll{
    export type Result = List[] | undefined
}