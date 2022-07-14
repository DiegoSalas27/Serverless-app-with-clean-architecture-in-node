import { User } from '@domain/models'
import { mockAddAccountParams } from '@domain/test'
import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers'
import { AccountMongoRepository } from './account-mongo-repository'

let userCollection: Collection<User>

describe('AccountMongo repository', () => {
  // This is an integration test
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    userCollection = MongoHelper.getCollection('users')
    await userCollection.deleteMany({}) // delete objects in memory so that tests don't overlap
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

      expect(accountId).toBeTruthy()
      expect(typeof accountId).toBe('string')
      expect(foundUser).toEqual({
        _id: new ObjectId(accountId),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      })
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      const user = mockAddAccountParams() as User
      await userCollection.insertOne(user)
      const account = await sut.loadByEmail(user.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.firstName).toBe(user.firstName)
      expect(account.email).toBe(user.email)
      expect(account.lastName).toBe(user.lastName)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeFalsy()
    })
  })
})
