import { LoadAccountByEmailRepositorySpy, AddAccountRepositorySpy } from '@data/test'
import { throwError } from '@domain/test/helpers'
import { mockAddAccountParams, mockAccountModel } from '@domain/test/mock-account'
import { DbAddAccount } from './db-add-account'

type SutTypes = {
  sut: DbAddAccount
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  loadAccountByEmailRepositorySpy.accountModel = null
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(loadAccountByEmailRepositorySpy, addAccountRepositorySpy)

  return {
    sut,
    loadAccountByEmailRepositorySpy,
    addAccountRepositorySpy
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call loadByEmail with correct email', async () => {
    const { loadAccountByEmailRepositorySpy, sut } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
  })

  test("Should return null if LoadAccountByEmailRepository doesn't return null", async () => {
    const { loadAccountByEmailRepositorySpy, sut } = makeSut()
    loadAccountByEmailRepositorySpy.accountModel = mockAccountModel()
    const accountId = await sut.add(mockAddAccountParams())
    expect(accountId).toBeNull()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { addAccountRepositorySpy, sut } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)

    expect(addAccountRepositorySpy.accountParams).toEqual({
      email: addAccountParams.email,
      firstName: addAccountParams.firstName,
      lastName: addAccountParams.lastName
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositorySpy, sut } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockImplementation(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return accountId on success', async () => {
    const { addAccountRepositorySpy, sut } = makeSut()
    const response = await sut.add(mockAddAccountParams())
    expect(response).toBe(addAccountRepositorySpy.accountId)
  })
})
