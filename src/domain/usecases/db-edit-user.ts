import { unauthorized } from "@/application/helpers";
import { CheckUserById, EditUser } from "../contracts/repos";
import { JwtTokenHandler } from "@/infra/gateways";
import { HttpResponse } from "@/application/contracts";

export class DbEditUser implements EditUser {
    constructor(
        private readonly EditUser: EditUser,
        private readonly checkUserExistsById: CheckUserById,
        private readonly jwtTokenHandler: JwtTokenHandler
    ){}
    async edit(user: EditUser.Params): Promise<EditUser.Result | HttpResponse>{

        let idExists = false

        !idExists ? await this.checkUserExistsById.check(user.id) : idExists = false

        if(!idExists){
            return {
                id: Number(user.id),
                statusCode: 406,
                message: 'Usuário não encontrado!'
            }
        }

        if (!user.token) {
            return unauthorized();
        }

        const auth = user.token.split(' ')[1];
        const idValidate = await this.jwtTokenHandler.validate({token: auth});

        if(!this.checkUserExistsById.check(Number(idValidate))){
            return unauthorized();
        }

        return await this.EditUser.edit(user)
    };
}