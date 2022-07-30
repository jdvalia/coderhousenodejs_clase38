import { Router } from 'express'
import * as cartsController from '../controller/CartsController.js'
import passport from '../controller/PassportController.js'
import { mdwValidateSchemaNewCart } from "../middleware/cartsMDW.js"

const CartsRoutes = new Router();

//GET '/carts' -> devuelve todos los carts 
CartsRoutes.get('/',
        passport.authenticate('jwt', { session: false }),
        cartsController.obtenerCarts)
//GET '/carts/:idCart' -> devuelve el contenido de un cart
CartsRoutes.get('/:idCart',
        passport.authenticate('jwt', { session: false }),
        cartsController.obtenerCart)
//GET '/carts/:emailUsuario' -> devuelve todos los carts de un usuario y su contenido.
CartsRoutes.get('/usuario/:emailUsuario',
        passport.authenticate('jwt', { session: false }),
        cartsController.obtenerCartsDeUnUsuario)
//POST '/carts' -> crea un cart y devuelve el id asignado. El Products hay que crearlo como un array vacio.
CartsRoutes.post('/',
        passport.authenticate('jwt', { session: false }),
        mdwValidateSchemaNewCart,
        cartsController.crearCart)
//POST '/carts/:id/products' -> agrega un product al cart indicado x el body
CartsRoutes.post('/:idCart/products',
        passport.authenticate('jwt', { session: false }),
        cartsController.agregarProductAlCart)
//DELETE '/carts/:id/product/:id' -> elimina un product al cart indicado. El ID del producto a borrar es el TEXTO
CartsRoutes.delete('/:idCart/product/:idProduct',
        passport.authenticate('jwt', { session: false }),
        cartsController.borrarProductAlCart)
//DELETE '/carts/:idCart' -> elimina un cart según su id.
CartsRoutes.delete('/:idCart',
        passport.authenticate('jwt', { session: false }),
        cartsController.borrarCart)

export default CartsRoutes 