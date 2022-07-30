import schemaNewProduct from '../schemas/productsSchemas.js'
import logger from '../logger.js'

export async function mdwValidateSchemaNewProduct(req, res, next) {
    logger.info(`middleware/products.js: mdwValidateSchemaNewProduct`)
    try {
        await schemaNewProduct.validateAsync(req.body)
    }
    catch (err) {
        logger.warn(`Error al validar el esquema de products - Error: ${err}`)
        return res.status(400).json({ descripcion: `Error al validar el esquema de products - Error: ${err}` })
    }

    next();

}