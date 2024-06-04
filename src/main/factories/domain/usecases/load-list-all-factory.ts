import { LoadListAll } from '../../../../domain/contracts/repos'
import { DbLoadListAll } from '../../../../domain/usecases'
import { PgListRepository } from '../../../../infra/repos/postgres'

export const makeDbLoadListAll = (): LoadListAll => {
  const pgListRepository = new PgListRepository()
  return new DbLoadListAll(pgListRepository)
}