import { AddUser } from "../contracts/repos";

export class DbAddUser implements AddUser {
    constructor(
        private readonly addUser: AddUser
    ){}
    async add(user: AddUser.Params): Promise<AddUser.Result>{
        return await this.addUser.add(user)
    };
}