import { mockAccountModel } from '@domain/test'
import { AddAccountParams, IAddAccount } from '@domain/usecases/account'

export class AddAccountSpy implements IAddAccount {
  accountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add(account: AddAccountParams): Promise<string> {
    this.addAccountParams = account
    return this.accountModel.id
  }
}
