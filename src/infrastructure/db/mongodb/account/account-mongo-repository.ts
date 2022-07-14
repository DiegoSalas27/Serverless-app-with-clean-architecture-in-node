import { IAddAccountRepository, ILoadAccountByEmailRepository } from '@data/protocols/db/account'
import { User } from '@domain/models'
import { MongoHelper } from '../helpers'

export class AccountMongoRepository implements IAddAccountRepository, ILoadAccountByEmailRepository {
  async loadByEmail(email: string): Promise<ILoadAccountByEmailRepository.Result> {
    const accountCollection = MongoHelper.getCollection<User>('users')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async add(accountParams: User): Promise<string> {
    const accountCollection = MongoHelper.getCollection<User>('users')
    const { insertedId } = await accountCollection.insertOne(accountParams)
    return insertedId.toString()
  }
}
