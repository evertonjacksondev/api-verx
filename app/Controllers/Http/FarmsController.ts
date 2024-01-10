import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm';

export default class FarmsController {


    async createFarm({ request, response }: HttpContextContract) {
        try {
            let { farm_name, farm_area_total, farm_area_used } = request.only(['farm_name', 'farm_area_total', "farm_area_used"])
            const farm = await Farm.create({ farm_name, farm_area_total, farm_area_used })
            return response.status(201).json(farm);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async listFarmId({ response, params }: HttpContextContract) {
        try {
            const { id } = params
            const farm = await Farm.find(id)
            return response.status(200).json(farm);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async listAllFarm({ response }: HttpContextContract) {
        try {
            const farm = await Farm.all()
            return response.status(200).json(farm);

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async deleteFarm({ response, params }: HttpContextContract) {
        try {

            const { id } = params
            const farm = await Farm.find(id)
            await farm?.delete()
            return response.status(200).json({ message: 'Fazenda Deletada!' });

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async editFarm({ request, params, response }: HttpContextContract) {
        try {
            const { id } = params
            let dataToUpdate =
                request.only(['farm_name'])
            const farm = await Farm.findOrFail(id)
            farm.merge(dataToUpdate);
            await farm.save();
            return response.status(200).json(farm);

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}
