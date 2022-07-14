import { User } from '../../domain/models'
import { mockAccountModel } from '../../domain/test/mock-account'
import { ILoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'

export class LoadAccountByEmailRepositorySpy implements ILoadAccountByEmailRepository {
  accountModel = mockAccountModel()
  email: string

  async loadByEmail(email: string): Promise<User> {
    this.email = email
    return this.accountModel
  }
}
