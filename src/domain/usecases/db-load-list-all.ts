import { JwtTokenHandler } from "@/infra/gateways";
import { unauthorized } from "@/application/helpers";
import { CheckUserById, LoadListAll } from "../contracts/repos";

export class DbLoadListAll implements LoadListAll {
    constructor(
        private readonly loadListAll: LoadListAll,
        private readonly checkUserExistsById: CheckUserById,
        private readonly jwtTokenHandler: JwtTokenHandler
    ) { }

    async loadAll(token: string): Promise<LoadListAll.Result> {
        if (!token) {
            return unauthorized();
        }

        const auth = token.split(' ')[1];
        const idValidate = await this.jwtTokenHandler.validate({token: auth});

        if(!this.checkUserExistsById.check(Number(idValidate))){
            return unauthorized();
        }


        return await this.loadListAll.loadAll(token)
    };
}