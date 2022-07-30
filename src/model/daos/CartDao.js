import ContainerDao from './ContainerDao.js';
import CustomError from '../../errores/CustomError.js'

export default class CartsDao extends ContainerDao {

  constructor() {
    super('carts')
  }

  async getById(id) {
    return await super.getById({ id: id })
  }

  async deleteById(id) {
    return await super.deleteById({ id: id })
  }

  async getByEmail(email) {
    return await super.listByQuery({ emailUsuario: email })
  }

  async updateAgregarProductAlCart(idCart, idProduct) {
    try {
      await this.collection.updateOne(
        { id: idCart },
        { '$push': { products: idProduct } })
      return await this.getById(idCart)
    }
    catch (err) {
      throw new CustomError(500, `Error al agregar un product al cart`, err)
    }
  }

  async updateEliminarProductAlCart(idUsuario, idProduct) {
    try {
      await this.collection.updateOne(
        { id: idUsuario },
        { '$pull': { products: { $eq: idProduct } } }
      )
      return await this.getById(idUsuario)
    }
    catch (err) {
      throw new CustomError(500, `Error al eliminar un product al cart`, err)
    }
  }

}
