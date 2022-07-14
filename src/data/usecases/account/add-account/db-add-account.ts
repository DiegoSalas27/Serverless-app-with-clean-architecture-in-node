import { AddAccountParams, IAddAccount } from '../../../../domain/usecases/account'
import { ILoadAccountByEmailRepository } from '../../../protocols/db/account/load-account-by-email-repository'

export class DbAddAccount implements IAddAccount {
  constructor(private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository) {}

  async add(accountParams: AddAccountParams): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountParams.email)
    return account.email
  }
}
