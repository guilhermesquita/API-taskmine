import { LoadListAll } from "@/domain/contracts/repos"
import { PgConnection } from "./helpers"
import { PgList } from "./entities"
import { List } from "@/domain/entities"

export class PgListRepository implements LoadListAll {
    async loadAll(): Promise<LoadListAll.Result> {
        const pgListRepo = PgConnection.getInstance()
            .connect()
            .getRepository(PgList)

        const listPg = await pgListRepo.find()
        return listPg as unknown as List[]
    };
}