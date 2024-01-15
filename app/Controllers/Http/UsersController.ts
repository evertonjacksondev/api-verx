import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import { UserDto } from '../dto/user-dto';


export default class UsersController {


    async createUser({ request, response }: HttpContextContract) {
        try {
            let { city, document, name, uf, document_type } =
                request.only(['city', 'document', 'name', 'uf', 'document_type'])

            let newDocument = Number(document.replace(/[^\d]/g, ''))

            const verify = await User
                .query()
                .where('document', '=', newDocument)

            if (verify.length) throw { message: 'Usuário Já cadastrado' }
            const user = await User.create({ city, document: newDocument, name, uf, document_type })
            return response.status(201).json(user);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    async listUserId({ response, params }: HttpContextContract) {
        try {
            const { id } = params
            const user = await User.find(id)
            return response.status(200).json(user);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async listAllUsers({ response }: HttpContextContract) {
        try {
            const users = await User.query()
                .select('*')
                .leftJoin('farms', 'users.id', 'farms.user_id')
                .leftJoin('product_farms', 'farms.id', 'product_farms.farm_id')
                .leftJoin('products', 'product_farms.product_id', 'products.id')

            function groupBy(array, key) {
                return array.reduce((acc, item) => ({
                    ...acc,
                    [item[key]]: [...(acc[item[key]] ?? []), item],
                }),
                    {})
            }

            const usersGroup = groupBy(users, 'name')
            const newArray: UserDto[] = [];

            for (let users in usersGroup) {
                const newUsers = new UserDto()

                newUsers.id = usersGroup[users][0].$extras.user_id || usersGroup[users][0].id
                newUsers.name = usersGroup[users][0].name
                newUsers.city = usersGroup[users][0].city
                newUsers.document = usersGroup[users][0].document
                newUsers.document_type = usersGroup[users][0].document_type
                newUsers.uf = usersGroup[users][0].uf

                const items: any = []
                for (let product of usersGroup[users]) {

                    if (product.$extras.product_id && product.$extras.product_name) {
                        items.push({
                            farm_name: product.$extras.farm_name,
                            product_id: product.$extras.product_id,
                            product_name: product.$extras.product_name
                        })
                    }
                }
                newUsers.cultivation = items
                newArray.push(newUsers)
            }
            return response.status(200).json(newArray);

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async listAllUsersSelect({ response }: HttpContextContract) {
        try {
            const user = (await User.query().select('id', 'name', 'document'))
            return response.status(200).json(user);

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async deleteUser({ response, params }: HttpContextContract) {
        try {

            const { id } = params
            const user = await User.find(id)
            await user?.delete()
            return response.status(200).json({ message: 'Usuario Deletado!' });

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async editUser({ request, params, response }: HttpContextContract) {
        try {
            const { id } = params
            let dataToUpdate =
                request.only(['city', 'document', 'name', 'UF', 'document_type'])
            const user = await User.findOrFail(id)
            user.merge(dataToUpdate);
            await user.save();
            return response.status(200).json(user);

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

}
