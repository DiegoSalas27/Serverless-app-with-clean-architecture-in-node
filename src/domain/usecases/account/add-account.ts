import { User } from '../../models/user'

export type AddAccountParams = Omit<User, 'id' | 'tasks'>

export interface IAddAccount {
  add(account: AddAccountParams): Promise<string>
}
