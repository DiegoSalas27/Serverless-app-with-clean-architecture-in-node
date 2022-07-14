import { IAddAccountRepository } from '@data/protocols/db/account/add-account-repository'
import { ILoadAccountByEmailRepository } from '@data/protocols/db/account/load-account-by-email-repository'
import { IAddAccount, AddAccountParams } from '@domain/usecases/account'

export class DbAddAccount implements IAddAccount {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly addAccountRepository: IAddAccountRepository
  ) {}

  async add(accountParams: AddAccountParams): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountParams.email)
    if (!account) {
      const newAccountId = await this.addAccountRepository.add(accountParams)
      return newAccountId
    }

    return null
  }
}
