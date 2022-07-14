import { IAddAccount } from '@domain/usecases/account'
import { EmailInUseError } from '@presentation/errors/email-in-use-error'
import { forbidden, ok, serverError } from '@presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols'

export class SignUpController implements Controller {
  constructor(private readonly addAccount: IAddAccount) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accountId = await this.addAccount.add(httpRequest.body)
      if (!accountId) {
        return forbidden(new EmailInUseError())
      }

      return ok(accountId)
    } catch (error) {
      return serverError(error)
    }
  }
}
