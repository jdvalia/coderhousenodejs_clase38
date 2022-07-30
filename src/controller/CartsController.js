import CartsApi from '../api/CartsApi.js'
import logger from '../logger.js'

const carts = new CartsApi();

//devuelve todos los carts
export async function obtenerCarts(req, res) {
    logger.info(`GET api/carts`)
    try {
        const cartsList = await carts.getCarts()
        res.status(200).json(cartsList)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//devuelve el contenido cart enviado como parametro
export async function obtenerCart(req, res) {
    let idCart = req.params.idCart;
    logger.info(`GET api/carts/${idCart}`)
    try {
        const cartsList = await carts.getCart(idCart)
        res.status(200).json(cartsList)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//Dado un emailUsuario por parametro devuelve todos los carts del usuario con los products cargados
export async function obtenerCartsDeUnUsuario(req, res) {
    let emailUsuario = req.params.emailUsuario;
    logger.info(`GET api/carts/${emailUsuario}`)
    try {
        const cart = await carts.getCartsDelUsuario(emailUsuario)
        res.status(200).json(cart)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//crea un cart y devuelve el id asignado
export async function crearCart(req, res) {
    logger.info(`POST api/carts`)
    try {
        const cart = await carts.addCart(req.body)
        res.status(200).json(cart)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

// recibe y agrega un product al cart indicado x el body
export async function agregarProductAlCart(req, res) {
    let idCart = req.params.idCart;
    let idProduct = [];
    idProduct = req.body.products;
    logger.info(`POST api/carts/${idCart}/products`)
    try {
        const cart = await carts.addProductAlCart(idCart, idProduct)
        res.status(200).json(cart)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

// recibe y elimina un product al cart indicado 
export async function borrarProductAlCart(req, res) {
    let idCart = req.params.idCart;
    let idProduct = req.params.idProduct;
    logger.info(`DELETE api/carts/${idCart}/products/${idProduct}`)
    try {
        const cart = await carts.deleteProductAlCart(idCart, idProduct)
        res.status(200).json(cart)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

// elimina un cart según su id.
export async function borrarCart(req, res) {
    let idCart = req.params.idCart;
    logger.info(`DELETE api/carts/${idCart}`)
    try {
        const cart = await carts.deleteCart(idCart)
        res.status(200).json(cart)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}
