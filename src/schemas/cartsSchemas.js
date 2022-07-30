import Joi from 'joi'

const schemaNewCart = Joi.object(
    {
        emailUsuario: Joi.string()
            .email()
            .required(),
        direccionEntrega: Joi.string()
            .required(),
        products: Joi.array().items(Joi.object(
            {
                idProduct: Joi.string().required(),
                precioProduct: Joi.number().required(),
                cantidad: Joi.number().required()
            }
        )
        )
    }
)

export default schemaNewCart;