import express, { json, urlencoded } from 'express';
import passport from './controller/PassportController.js';
// routes
import UsersRoutes from './routes/usuarios.js';
import ProductsRoutes from './routes/products.js';
import CartsRoutes from './routes/carts.js';
import OrdersRoutes from './routes/orders.js';
import ChatRoutes from './routes/chat.js';
import webRoutes from './routes/web.js';
import DefaultRoutes from "./routes/default.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from './swaggerSpecs.js';

export function crearServidor() {

    const app = express()
    app.use(express.static('public'))
    app.use(json()) //mdw para extraer el json que viene en las peticiones
    app.use(urlencoded({ extended: true }))  //mdw para poder extraer los datos que vienen en la url cuando se envia un formulario (el true para poder enviar objetos anidados)
    app.set('view engine', 'ejs') //Configuracion del motor de vistas 

    app.use(passport.initialize())

    // routes apiRestFull
    app.use('/', webRoutes)
    app.use('/api/usuarios', UsersRoutes) //usuarios que realizan la compra de los products
    app.use('/api/products', ProductsRoutes) //products que tiene el sitio
    app.use('/api/carts', CartsRoutes) //carts de compras de los usuarios
    app.use('/api/orders', OrdersRoutes) // orders realizados por el usuario, cart pasa a estado Cerrado
    app.use('/api/chat', ChatRoutes) // mensajes del chat 

    //documentacion
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

    //routes not found
    app.use('/*', DefaultRoutes)

    return app
}