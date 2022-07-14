import faker from '@faker-js/faker'
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
})
