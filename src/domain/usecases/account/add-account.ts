import { User } from '../../models'

export type AddAccountParams = Omit<User, 'id' | 'tasks'>

export interface IAddAccount {
  add(account: IAddAccount.Params): Promise<IAddAccount.Result>
}

export namespace IAddAccount {
  export type Params = AddAccountParams
  export type Result = string
}