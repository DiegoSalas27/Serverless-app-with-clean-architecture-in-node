import { adaptRoute } from '@main/adapters/express-route-adapter'
import { makeSignUpController } from '@main/factories/controllers/signup/signup-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
