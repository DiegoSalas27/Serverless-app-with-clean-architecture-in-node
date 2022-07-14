import { makeDbAddAccount } from '@main/factories/usecases/account/add-account/db-add-account-factory'
import { SignUpController } from '@presentation/controllers/signup/signup-controller'
import { Controller } from '@presentation/protocols'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccount())
  return signUpController
}
