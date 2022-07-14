import { adaptRoute } from '@main/adapters/express-route-adapter'
import { makeSignUpController } from '@main/factories/controllers/signup/signup-controller-factory'
import { Express } from 'express'

export default (app: Express): void => {
  app.post('/signup', adaptRoute(makeSignUpController()))
}
