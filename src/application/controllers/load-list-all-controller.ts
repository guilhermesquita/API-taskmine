import { LoadListAll } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { ok, serverError } from '../helpers'

export class LoadListAllController implements Controller{
    constructor(
        private readonly loadListAll: LoadListAll 
    ){}

    async handle(request: LoadListAllController.Request): Promise<HttpResponse>{
        try {
            const {authorization} = request
            return ok(await this.loadListAll.loadAll(authorization))
        } catch (error: any) {
            return serverError(error)
        }
    };
}

export namespace LoadListAllController {
    export type Request  = {
        authorization: string
    }
}