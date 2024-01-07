
import Route from '@ioc:Adonis/Core/Route'

Route.get('/v1/', async () => {
  return { hello: 'world' }
})

Route.post('/v1/user', 'UsersController.createUser')

