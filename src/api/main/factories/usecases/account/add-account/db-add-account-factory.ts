import { DbAddAccount } from '@data/usecases/account'
import { IAddAccount } from '@domain/usecases/account'
import { AccountMongoRepository } from '@infrastructure/db/mongodb/account/account-mongo-repository'

export const makeDbAddAccount = (): IAddAccount => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(accountMongoRepository, accountMongoRepository)
}
