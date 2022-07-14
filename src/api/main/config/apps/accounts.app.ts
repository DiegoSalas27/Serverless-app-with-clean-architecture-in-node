import express from 'express'
import setupMiddlewares from '../middlewares'
import setupAccountRoutes from '../routes/account-routes'

const app = express()
setupMiddlewares(app)
setupAccountRoutes(app)
export default app