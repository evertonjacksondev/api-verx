import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm';

export default class FarmsController {


    async createUser({ request, response }: HttpContextContract) {
        try {
            let { city, document, name, UF, document_type } =
                request.only(['city', 'document', 'name', 'UF', 'document_type'])

            const user = await Farm.create({ city, document, name, UF, document_type })
            return response.status(201).json(user);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async listUserId({ response, params }: HttpContextContract) {
        try {
            const { id } = params
            const user = await Farm.find(id)
            return response.status(200).json(user);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async listAllUsers({ response }: HttpContextContract) {
        try {
            const user = await Farm.all()
            return response.status(200).json(user);

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async deleteUser({ response, params }: HttpContextContract) {
        try {

            const { id } = params
            const user = await Farm.find(id)
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
            const user = await Farm.findOrFail(id)
            user.merge(dataToUpdate);
            await user.save();
            return response.status(200).json(user);

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}
