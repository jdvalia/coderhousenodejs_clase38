import ProductsDao from '../model/daos/ProductsDao.js';
import ProductDto from '../model/dtos/ProductDto.js';
import logger from '../logger.js'
import CustomError from '../errores/CustomError.js'

export default class ProductsApi {

    constructor() {
        this.productsDao = new ProductsDao();
    }

    async getProducts() {
        const productsObj = await this.productsDao.getAll();
        return productsObj;
    }

    async getProduct(id) {
        const productsObj = await this.productsDao.getById(id);
        return new ProductDto(productsObj);
    }

    async getProductPorCategoria(categoria) {
        const productsObj = await this.productsDao.getByCategoria(categoria);
        return productsObj;
    }

    async addProduct(objeto) {
        const product = new ProductDto(objeto)
        await this.productsDao.add(product);
        return product;
    }

    async putProduct(objeto) {
        await this.productsDao.update(objeto);
        const productsObj = await this.productsDao.getById(objeto.id)
        return new ProductDto(productsObj);
    }

    async deleteProduct(id) {
        await this.productsDao.deleteById(id);
    }

}
