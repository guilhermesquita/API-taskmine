import { Controller } from '@/application/contracts'
import { makePgTransactionController } from '../decorators'
import { makeDbLoadUserAll } from '../../domain/usecases'
import { LoadUserAllController } from '@/application/controllers'

export const makeLoadUserAllController = (): Controller => {
  const controller = new LoadUserAllController(
    makeDbLoadUserAll(),
  )
  return makePgTransactionController(controller)
}