import { JwtTokenHandler } from '@/infra/gateways'
import { LoadListAll } from '../../../../domain/contracts/repos'
import { DbLoadListAll } from '../../../../domain/usecases'
import { PgListRepository, PgUserRepository } from '../../../../infra/repos/postgres'

export const makeDbLoadListAll = (): LoadListAll => {
  const pgListRepository = new PgListRepository()
  const pgUserRepository = new PgUserRepository()
  return new DbLoadListAll(pgListRepository, pgUserRepository, new JwtTokenHandler())
}