import { Router } from 'express'
import * as productsController from '../controller/ProductsController.js'
import passport from '../controller/PassportController.js'
import { esAdministrador } from '../controller/UsuariosController.js'
import { mdwValidateSchemaNewProduct } from "../middleware/productsMDW.js"

const ProductsRoutes = new Router();

//GET '/products' -> devuelve todos los products
ProductsRoutes.get('/',
        productsController.obtenerProducts)
//GET '/products/:idProduct' -> devuelve un product según su idProduct.
ProductsRoutes.get('/id/:idProduct',
        productsController.obtenerUnProduct)
//GET '/products/:categoria' -> devuelve todos los products de una categoria.
ProductsRoutes.get('/categoria/:categoria',
        productsController.obtenerProductsPorCategoria)
//POST '/products' -> recibe y agrega un product, y lo devuelve con su id asignado
ProductsRoutes.post('/',
        passport.authenticate('jwt', { session: false }),
        esAdministrador,
        mdwValidateSchemaNewProduct,
        productsController.agregarProduct)
//PUT '/products/' -> recibe y actualiza un product según su id.
ProductsRoutes.put('/',
        passport.authenticate('jwt', { session: false }),
        esAdministrador,
        productsController.actualizarProduct)
//DELETE '/products/:id' -> elimina un product según su id.
ProductsRoutes.delete('/:idProduct',
        passport.authenticate('jwt', { session: false }),
        esAdministrador,
        productsController.borrarProduct)

export default ProductsRoutes 