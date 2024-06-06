import { Authenticate } from "@/domain/contracts/repos";
import { Controller, HttpResponse, Validation } from "../contracts";
import { badRequest, ok, serverError } from "../helpers";

export class AuthenticateController implements Controller{
    constructor(
        private readonly authenticate: Authenticate,
        private readonly validation: Validation
        // private readonly 
    ){}
    async handle(request: AuthenticateController.Request): Promise<HttpResponse>{
        try {
            const erro = await this.validation.validate(request)
            if(erro){
                return badRequest(erro)
            }

            const {email, password} = request
            const result = await this.authenticate.auth({email, password})

            return ok(result)
        } catch (error: any) {
            return serverError(error)
        }
    };
}

export namespace AuthenticateController {
    export type Request = {
        email: string,
        password: string
    }       
}