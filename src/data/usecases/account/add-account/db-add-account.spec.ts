import { mockAddAccountParams } from '../../../../domain/test/mock-account'
import { LoadAccountByEmailRepositorySpy } from '../../../test/mock-db-account'
import { DbAddAccount } from './db-add-account'

type SutTypes = {
  sut: DbAddAccount
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbAddAccount(loadAccountByEmailRepositorySpy)

  return {
    sut,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call loadByEmail with correct email', async () => {
    const { loadAccountByEmailRepositorySpy, sut } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
  })
})
