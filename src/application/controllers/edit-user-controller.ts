import { EditUser } from "@/domain/contracts/repos";
import { badRequest, created, serverError } from "../helpers";
import { Controller, HttpResponse, Validation } from "../contracts";

export class EditUserController implements Controller{
    constructor(
        private readonly editUser: EditUser,
        private readonly validation: Validation
    ){}
    async handle(request: EditUserController.Request): Promise<HttpResponse>{
        try {
            const erro = this.validation.validate(request)
            if(erro){
                return badRequest(erro)
            }
            const {id, name, email, password, authorization} = request
            const result = await this.editUser.edit({id, name, email, password, token: authorization})
            return created(result)
        } catch (error: any) {
            return serverError(error)
        }
    };
}

export namespace EditUserController {
    export type Request = {
        id: number
        name: string
        email: string
        password: string
        authorization: string
    }
}