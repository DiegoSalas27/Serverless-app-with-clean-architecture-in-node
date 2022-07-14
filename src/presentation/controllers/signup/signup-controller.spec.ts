import { throwError } from '@domain/test'
import faker from '@faker-js/faker'
import { ServerError } from '@presentation/errors/server-error'
import { serverError } from '@presentation/helpers/http-helper'
import { HttpRequest } from '@presentation/protocols'
import { AddAccountSpy } from '@presentation/test/mock-account'
import { SignUpController } from './signup-controller'

const mockRequest = (): HttpRequest => {
  return {
    body: {
      firstName: faker.name.firstName(),
      email: faker.internet.email(),
      lastName: faker.name.lastName()
    }
  }
}

type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const sut = new SignUpController(addAccountSpy)

  return {
    sut,
    addAccountSpy
  }
}

describe('SignUp Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy, sut } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addAccountSpy.addAccountParams).toEqual({
      firstName: httpRequest.body.firstName,
      email: httpRequest.body.email,
      lastName: httpRequest.body.lastName
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
