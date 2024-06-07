import { Authenticate } from "../contracts/repos";

export class DbAuthenticate implements Authenticate{
    constructor(
        private readonly authenticate: Authenticate
    ){}
    async auth(params: Authenticate.Params): Promise<Authenticate.Result>{
        return await this.authenticate.auth(params)
    };
}