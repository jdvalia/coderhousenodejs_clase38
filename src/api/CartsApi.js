import CartsDao from '../model/daos/CartDao.js';
import CartDto from '../model/dtos/CartDto.js';
import logger from '../logger.js'
import CustomError from '../errores/CustomError.js'

export default class CartsApi {

    constructor() {
        this.cartsDao = new CartsDao();
    }

    async getCarts() {
        const cartsObj = await this.cartsDao.getAll();
        return cartsObj;
    }

    async getCart(idCart) {
        const cartsObj = await this.cartsDao.getById(idCart);
        return cartsObj;
    }

    async getCartsDelUsuario(emailUsuario) {
        const cartsObj = await this.cartsDao.getByEmail(emailUsuario);
        return cartsObj;
    }

    async addCart(objeto) {
        const cart = new CartDto(objeto)
        await this.cartsDao.add(cart);
        return cart;
    }

    async addProductAlCart(idCart, idProduct) {
        return await this.cartsDao.updateAgregarProductAlCart(idCart, idProduct);
    }

    async deleteProductAlCart(idCart, idProduct) {
        return await this.cartsDao.updateEliminarProductAlCart(idCart, idProduct);
    }

    async deleteCart(idCart) {
        return await this.cartsDao.deleteById(idCart);
    }

}
