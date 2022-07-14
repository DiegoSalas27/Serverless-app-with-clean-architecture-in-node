import { User } from '@domain/models'

export interface ILoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<ILoadAccountByEmailRepository.Result>
}

export namespace ILoadAccountByEmailRepository {
  export type Result = User
}
