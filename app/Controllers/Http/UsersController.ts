import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';


export default class UsersController {


    async createUser({ request, response }: HttpContextContract) {
        try {
            let { city, document, name, uf, document_type } =
                request.only(['city', 'document', 'name', 'uf', 'document_type'])
            document = Number(document.replaceAll('.', '').replaceAll('/', '').replaceAll('-', ''))
            const verify = await User
                .query()
                .where('document', '=', document)

            if (verify.length) throw { message: 'Usuário Já cadastrado' }
            const user = await User.create({ city, document: document, name, uf, document_type })
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
            const user = await User.all()
            return response.status(200).json(user);

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
