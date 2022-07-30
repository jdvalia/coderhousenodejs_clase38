import Joi from 'joi'

const schemaNewProduct = Joi.object(
    {
        nombre: Joi.string()
            .required(),
        descripcion: Joi.string(),
        precio: Joi.number()
            .precision(2)
            .positive()
            .required(),
        stock: Joi.number()
            .integer()
            .positive()
            .required(),
        categoria: Joi.string(),
    }
)

export default schemaNewProduct;
