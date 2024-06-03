import {AddUser, LoadUserAll} from '../../../domain/contracts/repos'
import { PgConnection } from './helpers/connection'
import {PgUser} from './entities/'
import { User } from '../../../domain/entities/user'

export class PgUserRepository implements LoadUserAll, AddUser{
    async loadAll(): Promise<LoadUserAll.Result>{
        const pgUserRepo = PgConnection.getInstance()
        .connect()
        .getRepository(PgUser)

        const userPg = await pgUserRepo.find()
        return userPg as unknown as User[]
    };

    async add(user: AddUser.Params):Promise<AddUser.Result>{
        const pgUserRepo = new PgUser();
        pgUserRepo.nm_user = user.name;
        pgUserRepo.email_user = user.email;
        pgUserRepo.password_user = user.password;

        const entityManager = PgConnection.getInstance().connect().createEntityManager()

        await entityManager.transaction(async manager => {
            const saved = await manager.save(PgUser, pgUserRepo);
            await manager.save(saved)
        })

        return {
            id: pgUserRepo.id_user,
            statusCode: 201,
            message: 'Usuário cadastrado com sucesso'
        }
    }
}