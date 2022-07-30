import { Router } from 'express'
import * as webController from '../controller/webController.js'
import passport from '../controller/PassportController.js'
import logger from '../logger.js'

const webRoutes = new Router();

/* ------------------------------------------------------ */
import multer from 'multer'
/* Multer config */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage })
/* ------------------------------------------------------ */

// Pantalla de inicio
webRoutes.get('/', webController.getInicio);

// REGISTRARSE
webRoutes.get('/registrarse', webController.getRegistrarse)
// POST '/registrarse' -> genera un nuevo usuario y renderiza la pantalla de inicio logeado
webRoutes.post('/registrarse',
  passport.authenticate('registro', { failureRedirect: '/failRegistro' }),
  webController.getLogin);

//LOGUEARSE
webRoutes.get('/login', webController.getLogin);
//POST '/login' --> recibe email y password del usuario
webRoutes.post('/login', passport.authenticate('login', {
  failureRedirect: '/failLogin'
}),
  webController.postLogin
);

//DESLOGUEARSE
webRoutes.get('/logout', webController.getLogout);

//SUBIR ARCHIVOS
webRoutes.get('/subirArchivos', webController.getSubirArchivo);
webRoutes.post('/subirArchivos', upload.single('miArchivo'), (req, res, next) => {
  logger.info(`POST /subirArchivos`)
  const file = req.file
  if (!file) {
    const error = new Error('Error subiendo archivo')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(`Archivo <b>${file.originalname}</b> subido exitosamente`)
})

//CHAT
webRoutes.get('/chat', webController.mensajesChat);

//INFO SERVER
webRoutes.get('/infoServer', webController.infoServer);

//CRUD
webRoutes.get('/crudProducts', webController.crudProducts);
webRoutes.get('/product/borrar/:id', webController.productBorrar);

webRoutes.get('/crudUsuarios', webController.crudUsuarios);
webRoutes.get('/usuario/borrar/:email', webController.usuarioBorrar);

webRoutes.get('/crudCarts', webController.crudCarts);
webRoutes.get('/cart/borrar/:id', webController.cartBorrar);

webRoutes.get('/crudOrders', webController.crudOrders);
webRoutes.get('/order/borrar/:id', webController.orderBorrar);

webRoutes.get('/crudMensajes', webController.crudmMensajes);
webRoutes.get('/mensajeChat/borrar/:id', webController.mensajeChatBorrar);

//ERRORES
webRoutes.get('/failLogin', webController.getfailLogin)
webRoutes.get('/failRegistro', webController.getfailRegistro)

export default webRoutes