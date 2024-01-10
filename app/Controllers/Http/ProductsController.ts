import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';

export default class ProductsController {


    async createProduct({ request, response }: HttpContextContract) {
        try {
            let { product_name } =
                request.only(['product_name'])

            const product = await Product.create({ product_name })
            return response.status(201).json(product);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async listProductId({ response, params }: HttpContextContract) {
        try {
            const { id } = params
            const product = await Product.find(id)
            return response.status(200).json(product);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async listAllProduct({ response }: HttpContextContract) {
        try {
            const product = await Product.all()
            return response.status(200).json(product);

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async deleteProduct({ response, params }: HttpContextContract) {
        try {

            const { id } = params
            const product = await Product.find(id)
            await product?.delete()
            return response.status(200).json({ message: 'Produto Deletado!' });

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async editProduct({ request, params, response }: HttpContextContract) {
        try {
            const { id } = params
            let dataToUpdate =
                request.only(['product_name'])
            const product = await Product.findOrFail(id)
            product.merge(dataToUpdate);
            await product.save();
            return response.status(200).json(product);

        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}
