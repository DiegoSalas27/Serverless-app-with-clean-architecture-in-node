import { ServerError } from '@presentation/errors/server-error'
import { HttpResponse } from '@presentation/protocols'

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
