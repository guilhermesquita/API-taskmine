import { AddList, LoadListAll } from "@/domain/contracts/repos"
import { PgConnection } from "./helpers"
import { PgList } from "./entities"
import { List } from "@/domain/entities"
import { HttpResponse } from "@/application/contracts"
import { UuidGenerator } from "@/infra/gateways"

export class PgListRepository implements AddList, LoadListAll {
    async add(list: AddList.Params): Promise<AddList.Result | HttpResponse>{

        const idGenerator = new UuidGenerator()
        const id_list = idGenerator.generate()

        const pgListRepo = new PgList();
        pgListRepo.id_list = id_list;
        pgListRepo.nm_list = list.name;
        pgListRepo.fr_user = list.fr_user;

        const entityManager = PgConnection.getInstance().connect().createEntityManager()

        await entityManager.transaction(async manager => {
            let saved = await manager.save(PgList, pgListRepo);
            await manager.save(saved)
        })

        return {
            id: pgListRepo.id_list,
            statusCode: 201,
            message: 'Usuário cadastrado com sucesso'
        }

    }
    async loadAll(): Promise<LoadListAll.Result> {
        const pgListRepo = PgConnection.getInstance()
            .connect()
            .getRepository(PgList)

        const listPg = await pgListRepo.find()
        return listPg as unknown as List[]
    };
}