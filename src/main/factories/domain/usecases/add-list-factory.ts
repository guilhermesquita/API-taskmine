import { AddList } from "@/domain/contracts/repos";
import { DbAddList } from "@/domain/usecases";
import { JwtTokenHandler } from "@/infra/gateways";
import { PgListRepository, PgUserRepository } from "@/infra/repos/postgres";

export const makeDbAddList = (): AddList => {
    const pgListRepository = new PgListRepository()
    const pgUserRepository = new PgUserRepository()
    return new DbAddList(pgListRepository, pgUserRepository, new JwtTokenHandler())
}