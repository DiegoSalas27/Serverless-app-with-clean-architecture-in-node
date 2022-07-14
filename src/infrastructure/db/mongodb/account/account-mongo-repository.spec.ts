import { User } from '@domain/models'
import { mockAddAccountParams } from '@domain/test'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers'
import { AccountMongoRepository } from './account-mongo-repository'

let userCollection: Collection<User>

describe('AccountMongo repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    test('Should return an accountId on add success', async () => {
      const sut = makeSut()
      const user = mockAddAccountParams() as User
      const accountId = await sut.add(user)

      const foundUser = await userCollection.findOne({
        email: user.email
      })

      expect(foundUser).toBeTruthy()
      expect(accountId).toBeTruthy()
      expect(typeof accountId).toBe('string')
    })
  })
})
