import ProductsApi from '../api/ProductsApi.js'
import logger from '../logger.js'

const products = new ProductsApi();

//devuelve todos los products de la coleccion
export async function obtenerProducts(req, res) {
    logger.info(`GET api/products`)
    try {
        const productsList = await products.getProducts()
        res.status(200).json(productsList)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//dado un id devuelve los datos de ese product
export async function obtenerUnProduct(req, res) {
    logger.info(`GET api/products/id/{idProduct}`)
    try {
        let id = req.params.idProduct;
        const product = await products.getProduct(id)
        res.status(200).json(product)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//obtenerProductsPorCategoria --> devuelve todos los products de una categoria
export async function obtenerProductsPorCategoria(req, res) {
    let categoria = req.params.categoria;
    logger.info(`GET api/products/categoria/${categoria}`)
    try {
        const product = await products.getProductPorCategoria(categoria)
        res.status(200).json(product)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//Con los datos del body agrega un product a la coleccion y devuelve el id creado 
export async function agregarProduct(req, res) {
    logger.info(`POST api/products`)
    try {
        let objeto = req.body;
        const product = await products.addProduct(objeto)
        res.status(200).json(product)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//dado un id product por parametro actualiza el product con los datos enviados en el body
export async function actualizarProduct(req, res) {
    logger.info(`PUT api/products`)
    try {
        let objeto = req.body;
        const product = await products.putProduct(objeto);
        res.status(200).json(product);
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//dado un id por parametro borra el mismo de la coleccion
export async function borrarProduct(req, res) {
    logger.info(`DELETE api/products`)
    try {
        let id = req.params.idProduct;
        const product = await products.deleteProduct(id)
        res.status(200).json(product)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}