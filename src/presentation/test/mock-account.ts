import { AddAccountParams, IAddAccount } from '@domain/usecases/account'
import faker from '@faker-js/faker'

export class AddAccountSpy implements IAddAccount {
  accountId = faker.datatype.uuid()
  addAccountParams: AddAccountParams

  async add(account: AddAccountParams): Promise<string> {
    this.addAccountParams = account
    return this.accountId
  }
}
