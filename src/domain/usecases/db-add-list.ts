import { unauthorized } from "@/application/helpers";
import { CheckUserById, AddList } from "../contracts/repos";
import { JwtTokenHandler } from "@/infra/gateways";
import { HttpResponse } from "@/application/contracts";

export class DbAddList implements AddList {
    constructor(
        private readonly AddList: AddList,
        private readonly checkUserExistsById: CheckUserById,
        private readonly jwtTokenHandler: JwtTokenHandler
    ) { }
    async add(list: AddList.Params): Promise<AddList.Result | HttpResponse>{
        let idExists = false

        await this.checkUserExistsById.check(list.fr_user) ? idExists = true : idExists = false

        if (!idExists) {
            return {
                id: 0,
                statusCode: 406,
                message: 'Usuário não encontrado!'
            }
        }

        if (!list.token) {
            return unauthorized();
        }

        const auth = list.token.split(' ')[1];
        const idValidate = await this.jwtTokenHandler.validate({ token: auth });

        if (!this.checkUserExistsById.check(Number(idValidate))) {
            return unauthorized();
        }

        return await this.AddList.add(list)
    }

    // async add(list: AddList.Params): Promise<AddList.Result | HttpResponse>{

    //     let idExists = false

    //     !idExists ? await this.checkUserExistsById.check(list.fr_user) : idExists = false

    //     if(!idExists){
    //         return {
    //             id: Number(list.fr_user),
    //             statusCode: 406,
    //             message: 'Usuário não encontrado!'
    //         }
    //     }

    //     if (!user.token) {
    //         return unauthorized();
    //     }

    //     const auth = user.token.split(' ')[1];
    //     const idValidate = await this.jwtTokenHandler.validate({token: auth});

    //     if(!this.checkUserExistsById.check(Number(idValidate))){
    //         return unauthorized();
    //     }

    //     return await this.AddList.add(user)
    // };
}