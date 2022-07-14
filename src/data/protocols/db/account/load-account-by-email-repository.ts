import { IAddAccount } from '../../../../domain/usecases/account'

export interface ILoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<ILoadAccountByEmailRepository.Result>
}

export namespace ILoadAccountByEmailRepository {
  export type Result = IAddAccount.Params
}
