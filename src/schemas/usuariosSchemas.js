import Joi from 'joi'

const schemaNewUser = Joi.object(
    {
        email: Joi.string()
            .email()
            .required(),
        password:Joi.string()
            .min(6)
            .max(15)
            .required(),
        username: Joi.string()
            .max(15)
            .required(),
        nombre: Joi.string()
            .required(),
        apellido: Joi.string()
            .required(),
        direccion: Joi.string(),        
        fechaNacimiento: Joi.string(),
        telefono: Joi.string(),
        avatar: Joi.string()
    }
)

export default schemaNewUser;
