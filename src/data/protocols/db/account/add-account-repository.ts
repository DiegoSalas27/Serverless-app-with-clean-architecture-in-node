import { IAddAccount } from '@domain/usecases/account'

export interface IAddAccountRepository {
  add(accountParams: IAddAccount.Params): Promise<string>
}
