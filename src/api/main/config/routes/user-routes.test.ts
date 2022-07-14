import { MongoHelper } from '@infrastructure/db/mongodb/helpers'
import request from 'supertest'
import { Collection } from 'mongodb'
import app from '@main/config/apps/accounts.app'
import { User } from '@domain/models'

let accountCollection: Collection<User>

describe('User Routes ', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('users')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/signup')
        .send({
          name: 'Rodrigo',
          email: 'rodrigo.maguino@gmail.com',
          password: '123',
          passwordConfirm: '123'
        })
        .expect(200)
    })
  })
})
