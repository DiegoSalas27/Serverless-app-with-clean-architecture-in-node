import { IAddAccount } from '@domain/usecases/account'
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols'

export class SignUpController implements Controller {
  constructor(private readonly addAccount: IAddAccount) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.addAccount.add(httpRequest.body)
    return null
  }
}
