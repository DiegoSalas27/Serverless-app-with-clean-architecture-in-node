import { User } from '../models'
import faker from '@faker-js/faker'
import { AddAccountParams } from '../usecases/account'

export const mockAddAccountParams = (): AddAccountParams => ({
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
})

export const mockAccountModel = (): User => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.findName(),
  email: faker.internet.email(),
  lastName: faker.name.findName(),
  tasks: []
})
