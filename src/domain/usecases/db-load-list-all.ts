import { LoadListAll } from "../contracts/repos";

export class DbLoadListAll implements LoadListAll {
    constructor(
        private readonly loadListAll: LoadListAll
    ){}

   async loadAll(): Promise<LoadListAll.Result>{
    return await this.loadListAll.loadAll()
   };
}