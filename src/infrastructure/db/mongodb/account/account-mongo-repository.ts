import { IAddAccountRepository, ILoadAccountByEmailRepository } from '@data/protocols/db/account'
import { User } from '@domain/models'
import { MongoHelper } from '../helpers'

export class AccountMongoRepository implements IAddAccountRepository, ILoadAccountByEmailRepository {
  async loadByEmail(email: string): Promise<ILoadAccountByEmailRepository.Result> {
    throw new Error('Method not implemented.')
  }

  async add(accountParams: User): Promise<string> {
    const accountCollection = MongoHelper.getCollection<User>('users')
    const { insertedId } = await accountCollection.insertOne(accountParams)

    return insertedId.toString()
  }
}
