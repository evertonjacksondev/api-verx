import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm';
import Product from 'App/Models/Product';
import ProductFarm from 'App/Models/ProductFarm';

export default class FarmsController {


    async createFarm({ request, response }: HttpContextContract) {
        try {
            let {
                farm_name,
                farm_area_total,
                farm_area_used,
                user_id,
                cultivations
            } = request.only([
                'farm_name',
                'farm_area_total',
                'farm_area_used',
                'user_id',
                'cultivations'
            ])
        
            const verify = await Farm
                .query()
                .where('farm_name', '=', farm_name)

            if (verify.length) throw { message: 'Fazenda já cadastrada' }

            const farm = await Farm.create(
                { farm_name, farm_area_total, farm_area_used, user_id })

                
            for (let cult of cultivations) {

                let product_id: any = cult.id
                let farm_id: any = farm.id

              await ProductFarm.create(
                    { product_id, farm_id })
            }


            return response.status(201);
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

    async listAllFarmsSelect({ response }: HttpContextContract) {
        try {
            const farms = (await Farm.query().select('id', 'product_name'))
            return response.status(200).json(farms);

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
