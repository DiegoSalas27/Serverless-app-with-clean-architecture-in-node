import { mockAccountModel, mockAddAccountParams } from '../../../../domain/test/mock-account'
import { AddAccountParams } from '../../../../domain/usecases/account'
import { ILoadAccountByEmailRepository } from '../../../protocols/db/account/load-account-by-email-repository'
import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  test('Should call loadByEmail with correct email', async () => {
    class LoadAccountByEmailRepositorySpy implements ILoadAccountByEmailRepository {
      accountModel = mockAccountModel()
      email: string

      async loadByEmail(email: string): Promise<AddAccountParams> {
        this.email = email
        return this.accountModel
      }
    }

    const loadAccountByEmailRepository = new LoadAccountByEmailRepositorySpy()
    const sut = new DbAddAccount(loadAccountByEmailRepository)

    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(loadAccountByEmailRepository.email).toBe(addAccountParams.email)
  })
})
