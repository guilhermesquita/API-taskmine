import { AddUser } from "@/domain/contracts/repos";
import { created } from "../helpers";
import { Controller, HttpResponse } from "../contracts";

export class AddUserController implements Controller{
    constructor(
        private readonly addUser: AddUser
    ){}
    async handle(request: AddUserController.Request): Promise<HttpResponse>{
        const {name, email, password} = request
        const result = await this.addUser.add({name, email, password})
        return created(result)
    };
}

export namespace AddUserController {
    export type Request = {
        name: string
        email: string
        password: string
    }
}