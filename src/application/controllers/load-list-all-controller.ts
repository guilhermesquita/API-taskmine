import { LoadListAll } from '@/domain/contracts/repos'
import { Controller, HttpResponse } from '../contracts'
import { ok, serverError } from '../helpers'

export class LoadListAllController implements Controller{
    constructor(
        private readonly loadListAll: LoadListAll 
    ){}

    async handle(): Promise<HttpResponse>{
        try {
            return ok(await this.loadListAll.loadAll())
        } catch (error: any) {
            return serverError(error)
        }
    };
}