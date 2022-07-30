import OrdersApi from '../api/OrdersApi.js'
import logger from '../logger.js'

const orders = new OrdersApi();

//devuelve todos los orders de todos los usuarios 
export async function obtenerOrders(req, res) {
    logger.info(`GET /api/orders`)
    try {
        const ordersList = await orders.getOrders()
        res.status(200).json(ordersList)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//devuelve un order en particular enviado por parametro
export async function obtenerOrder(req, res) {
    let idOrder = req.params.idOrder;
    logger.info(`GET /api/orders/${idOrder}`)
    try {
        const ordersList = await orders.getOrder(idOrder)
        res.status(200).json(ordersList)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//devuelve los orders del email pasado como parametro
export async function obtenerOrdersPorEmail(req, res) {
    logger.info(`Get /api/orders/usuario/{email}`)
    try {
        let email = req.params.email;
        const ordersList = await orders.getOrdersPorEmail(email)
        res.status(200).json(ordersList)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//agrega un nuevo order
export async function agregarOrder(req, res) {
    logger.info(`POST /api/orders`)
    try {
        let objeto = req.body;
        const order = await orders.addOrder(objeto)
        res.status(200).json(order)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//borrar un order en particular pasado como parametro 
export async function borrarOrder(req, res) {
    let idOrder = req.params.idOrder;
    logger.info(`DELETE /api/orders/${idOrder}`)
    try {
        const ordersList = await orders.deleteOrder(idOrder)
        res.status(200).json(ordersList)
    }
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}