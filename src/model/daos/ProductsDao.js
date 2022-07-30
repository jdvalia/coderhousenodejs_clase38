import ContainerDao from './ContainerDao.js';
import CustomError from '../../errores/CustomError.js'

export default class ProductsDao extends ContainerDao {

  constructor() {
    super('products')
  }

  async getById(id) {
    return await super.getById({ id: id })
  }

  async getByCategoria(categoria) {
    return await super.listByQuery({ categoria: categoria })
  }

  async deleteById(id) {
    return await super.deleteById({ id: id })
  }

  async searchByName(name) {
    return await super.listByQuery({ nombre: name })
  }

  async update({
    id,
    nombre,
    descripcion,
    precio,
    stock
  }) {

    try {
      await this.collection.updateOne(
        {
          id: id
        },
        {
          '$set':
          {
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            stock: stock
          }
        })

    } catch (err) {
      logger.error(err)
      throw new CustomError(500, 'Error al querer actualizar la BD con un documento a la coleccion por ID', err)
    }
  }


}