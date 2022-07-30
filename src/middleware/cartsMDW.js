import schemaNewCart from '../schemas/cartsSchemas.js'
import logger from '../logger.js'

export async function mdwValidateSchemaNewCart(req, res, next) {
    logger.info(`middleware/carts.js: mdwValidateSchemaNewCart`)
    try {
        await schemaNewCart.validateAsync(req.body)
    }
    catch (err) {
        logger.warn(`Error al validar el esquema de carts - Error: ${err}`)
        return res.status(400).json({ descripcion: `Error al validar el esquema de carts - Error: ${err}` })
    }

    next();

}