import { AddList } from "@/domain/contracts/repos";
import { Controller, HttpResponse, Validation } from "../contracts";
import { badRequest, created } from "../helpers";

export class AddListController implements Controller {
    constructor(
        private readonly addList: AddList,
        private readonly validation: Validation
    ){}

    async handle(request: AddListController.Request): Promise<HttpResponse>{
        try {
            const error = await this.validation.validate(request)
            if(error){
                return badRequest(error)
            }

            const {authorization, fr_user, name} = request
            const result = await this.addList.add({token: authorization, fr_user, name})

            return created(result)
        } catch (error: any) {
            return badRequest(error)
        }
    }
}

export namespace AddListController {
    export type Request = {
        authorization: string
        fr_user: number
        name: string
    }
}