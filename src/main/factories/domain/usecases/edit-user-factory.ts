import { EditUser } from "@/domain/contracts/repos";
import { DbEditUser } from "@/domain/usecases";
import { PgUserRepository } from "@/infra/repos/postgres";

export const makeDbEditUser = (): EditUser => {
    const pgUserRepository = new PgUserRepository()
    return new DbEditUser(pgUserRepository)
}