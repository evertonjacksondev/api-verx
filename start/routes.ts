
import Route from '@ioc:Adonis/Core/Route'



Route.post('/v1/users', 'UsersController.createUser')
Route.get('/v1/users/list', 'UsersController.list')

