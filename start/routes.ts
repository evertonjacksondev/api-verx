
import Route from '@ioc:Adonis/Core/Route'


Route.post('/v1/users', 'UsersController.createUser')
Route.put('/v1/users/:id', 'UsersController.editUser')
Route.get('/v1/users/list', 'UsersController.listAllUsers')
Route.get('/v1/users/list/:id', 'UsersController.listUserId')
Route.delete('/v1/users/list/:id', 'UsersController.deleteUser')

