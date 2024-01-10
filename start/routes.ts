
import Route from '@ioc:Adonis/Core/Route'


Route.get('/', () => 'running')
Route.post('/v1/users', 'UsersController.createUser')
Route.put('/v1/users/:id', 'UsersController.editUser')
Route.get('/v1/users/list', 'UsersController.listAllUsers')
Route.get('/v1/users/list/select', 'UsersController.listAllUsersSelect')
Route.get('/v1/users/list/:id', 'UsersController.listUserId')
Route.delete('/v1/users/list/:id', 'UsersController.deleteUser')


Route.post('/v1/farm', 'FarmsController.createFarm')
Route.put('/v1/farm/:id', 'FarmsController.editFarm')
Route.get('/v1/farm/list', 'FarmsController.listAllFarm')
Route.get('/v1/farm/list/:id', 'FarmsController.listFarmId')
Route.delete('/v1/farm/list/:id', 'FarmsController.deleteFarm')


Route.post('/v1/product', 'ProductsController.createProduct')
Route.put('/v1/product/:id', 'ProductsController.editProduct')
Route.get('/v1/product/list', 'ProductsController.listAllProduct')
Route.get('/v1/product/list/:id', 'ProductsController.listProductId')
Route.delete('/v1/product/list/:id', 'ProductsController.deleteProduct')