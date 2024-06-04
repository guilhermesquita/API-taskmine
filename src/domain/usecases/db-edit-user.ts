import { EditUser } from "../contracts/repos";

export class DbEditUser implements EditUser {
    constructor(
        private readonly EditUser: EditUser
    ){}
    async edit(user: EditUser.Params): Promise<EditUser.Result>{
        return await this.EditUser.edit(user)
    };
}