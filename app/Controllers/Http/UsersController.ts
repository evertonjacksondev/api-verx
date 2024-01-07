// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User"


export default class UsersController {

    async createUser({ request }) {
        const dataToCreate = request.only(['name','city','UF'])
        console.log(dataToCreate)
        return await User.create(dataToCreate)
    }

}
