import { PgConnection } from './helpers/connection'
import { AddUser, Authenticate, EditUser, LoadUserAll } from '@/domain/contracts/repos'
import { User } from '@/domain/entities'
import { PgUser } from './entities'
import { JwtTokenHandler } from '@/infra/gateways'

export class PgUserRepository implements LoadUserAll, AddUser, EditUser, Authenticate {
    async loadAll(): Promise<LoadUserAll.Result> {
        const pgUserRepo = PgConnection.getInstance()
            .connect()
            .getRepository(PgUser)

        const userPg = await pgUserRepo.find()
        return userPg as unknown as User[]
    };

    async add(user: AddUser.Params): Promise<AddUser.Result> {
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
            id: pgUserRepo.id_user as number,
            statusCode: 201,
            message: 'Usuário cadastrado com sucesso'
        }
    }

    async edit(user: EditUser.Params): Promise<EditUser.Result> {
        const pgUserRepo = PgConnection.getInstance()
            .connect()
            .getRepository(PgUser)

        const userToEdit = await pgUserRepo.findOne({
            where: {
                id_user: user.id
            }
        }) as unknown as PgUser

        userToEdit.nm_user = user.name || userToEdit.nm_user
        userToEdit.email_user = user.email || userToEdit.email_user
        userToEdit.password_user = user.password || userToEdit.password_user

        const entityManager = PgConnection.getInstance().connect().createEntityManager()

        await entityManager.transaction(async manager => {
            const saved = await manager.save(PgUser, userToEdit);
            await manager.save(saved)
        })

        return {
            id: userToEdit.id_user as number,
            statusCode: 201,
            message: 'Usuário editado com sucesso'
        }
    }

    async auth(params: Authenticate.Params): Promise<Authenticate.Result>{
        const pgUserRepo = PgConnection.getInstance()
           .connect()
           .getRepository(PgUser)

        
        const userPg = await pgUserRepo.findOne({
            where: {
                email_user: params.email,
                password_user: params.password
            }
        }) as unknown as PgUser

        const token = new JwtTokenHandler()

        const jwtToken = await token.generate({
            expirationInMs: 8 * 60 * 60 * 1000,
            key: userPg.id_user as string
        })

        return{
            id: userPg.id_user as number,
            email: userPg.email_user,
            token: jwtToken
        }
    }
}