import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = sut.getCollection('users')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = sut.getCollection('users')
    expect(accountCollection).toBeTruthy()
  })
})
