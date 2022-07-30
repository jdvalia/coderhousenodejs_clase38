import schemaNewUser from '../schemas/usuariosSchemas.js'
import UsuariosApi from '../api/UsuariosApi.js'
import logger from '../logger.js'

const usuarios = new UsuariosApi();

export async function mdwValidateSchemaNewUsuario(req, res, next) {
    logger.info(`middleware/usuarios.js: mdwValidateSchemaNewUsuario`)
    let data
    try {
        data = await schemaNewUser.validateAsync(req.body)
    }
    catch (err) {
        logger.warn(`Error al validar el esquema de usuarios - Error: ${err.details}`)
        return res.status(400).json({ descripcion: `Error al validar el esquema de usuarios - Error: ${err.details}` })
    }

    try {
        if (await usuarios.existeEmail(data.email)) {
            return res.status(400).json({ descripcion: 'El email ya se encuentra registrado' })
        }

        if (await usuarios.existeUsername(data.username))
            return res.status(400).json({ descripcion: 'El username ya se encuentra registrado' })
    }
    catch (err) {
        logger.error(`Error al ejecutar validaciones de usuarios - Error: ${err}`)
        return res.status(500).json({ descripcion: `Error al ejecutar validaciones de usuarios - Error: ${err}` })
    }

    next();

}