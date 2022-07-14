import { IAddAccountRepository } from '@data/protocols/db/account/add-account-repository'
import { ILoadAccountByEmailRepository } from '@data/protocols/db/account/load-account-by-email-repository'
import { User } from '@domain/models'
import { mockAccountModel } from '@domain/test/mock-account'
import { AddAccountParams } from '@domain/usecases/account'
import faker from '@faker-js/faker'

export class AddAccountRepositorySpy implements IAddAccountRepository {
  accountId = faker.datatype.uuid()
  accountParams: AddAccountParams

  async add(accountParams: AddAccountParams): Promise<string> {
    this.accountParams = accountParams
    return this.accountId
  }
}

export class LoadAccountByEmailRepositorySpy implements ILoadAccountByEmailRepository {
  accountModel = mockAccountModel()
  email: string

  async loadByEmail(email: string): Promise<User> {
    this.email = email
    return this.accountModel
  }
}
