import schemaNewChat from '../schemas/chatsSchemas.js'
import logger from '../logger.js'

export async function mdwValidateSchemaNewMensaje(req, res, next) {
    logger.info(`middleware/chats.js: mdwValidateSchemaNewMensaje`)
    try {
        await schemaNewChat.validateAsync(req.body)
    }
    catch (err) {
        logger.warn(`Error al validar el esquema de alta de chats - Error: ${err}`)
        return res.status(400).json({ descripcion: `Error al validar el esquema de alta de chats - Error: ${err}` })
    }

    next();

}


