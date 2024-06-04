import { Controller } from '@/application/contracts'
import { makePgTransactionController } from '../decorators'
import { makeDbLoadListAll } from '../../domain/usecases'
import { LoadListAllController } from '@/application/controllers'

export const makeLoadListAllController = (): Controller => {
  const controller = new LoadListAllController(
    makeDbLoadListAll(),
  )
  return makePgTransactionController(controller)
}