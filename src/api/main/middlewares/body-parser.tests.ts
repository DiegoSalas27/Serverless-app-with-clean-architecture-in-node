import app from '@main/config/apps/accounts.app'
import request from 'supertest'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    }) // temporal route to test
    await request(app).post('/test_body_parser').send({ name: 'Rodrigo' }).expect({ name: 'Rodrigo' })
  })
})
