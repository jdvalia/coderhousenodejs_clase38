import ContainerDao from './ContainerDao.js';

export default class OrdersDao extends ContainerDao {

  constructor() {
    super('orders')
  }

  async getById(id) {
    return await super.getById({ id: id })
  }

  async getByEmail(email) {
    return await super.getById({ "email": email })
  }

  async deleteById(id) {
    return await super.deleteById({ id: id })
  }

}