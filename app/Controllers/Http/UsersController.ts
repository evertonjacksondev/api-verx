import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';


export default class UsersController {

    async createUser({ request, response }: HttpContextContract) {
        try {
            const { name, city, UF } = request.only(['name', 'city', 'UF']);

            const user = await User.create({ city, name, UF })
            return response.status(201).json(user);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }


    async list({ response }: HttpContextContract) {
        try {

            const user = await User.all()
            return response.status(200).json(user);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

}
