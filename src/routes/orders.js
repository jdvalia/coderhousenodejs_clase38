import { Router } from 'express'
import * as ordersController from '../controller/OrdersController.js'
import passport from '../controller/PassportController.js'
import { esAdministrador } from '../controller/UsuariosController.js'

const OrdersRoutes = new Router();

//GET '/orders' -> devuelve los orders de todos los usuarios
OrdersRoutes.get('/',
    passport.authenticate('jwt', { session: false }),
    ordersController.obtenerOrders)
//GET '/orders/:idOrder' -> devuelve un order pasado como parametro
OrdersRoutes.get('/:idOrder',
    passport.authenticate('jwt', { session: false }),
    ordersController.obtenerOrder)
//GET '/orders/usuario/email' -> devuelve los orders dado un email
OrdersRoutes.get('/usuario/:email',
    passport.authenticate('jwt', { session: false }),
    ordersController.obtenerOrdersPorEmail)
//POST '/orders' -> agrega un nuevo order --> esto se da cuando el usuario clickea en "comprar" el cart. Debemos enviar el usuario (campo "email") y los products como array
OrdersRoutes.post('/',
    passport.authenticate('jwt', { session: false }),
    ordersController.agregarOrder)
//DELETE '/orders/:idOrder' -> Borra el Order con el ID solicitado
OrdersRoutes.delete('/:idOrder',
    passport.authenticate('jwt', { session: false }),
    esAdministrador,
    ordersController.borrarOrder)

export default OrdersRoutes 