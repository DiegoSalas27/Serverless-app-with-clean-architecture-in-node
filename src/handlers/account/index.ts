import 'module-alias/register'
import 'reflect-metadata'
import serverless from 'serverless-http'
import app = require('../../api/main/config/apps/accounts.app')

const expressHandler = serverless(app.default)
export async function handler(event, context): Promise<Object> {
  context.callbackWaitsForEmptyEventLoop = false
  const result = await expressHandler(event, context)
  return result
}
