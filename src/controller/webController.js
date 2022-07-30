import logger from '../logger.js'
import UsuariosApi from '../api/UsuariosApi.js'
import ProductsApi from '../api/ProductsApi.js'
import CartsApi from '../api/CartsApi.js'
import OrdersApi from '../api/OrdersApi.js'
import ChatApi from '../api/ChatApi.js'
import jwt from 'jsonwebtoken'
import { jwtOpts } from '../../config/config.js'

import os from 'os'
const cantidadDeCPUs = os.cpus().length

const usuarios = new UsuariosApi();
const products = new ProductsApi();
const carts = new CartsApi();
const orders = new OrdersApi();
const chat = new ChatApi();
let rolUsuario = undefined
let nombreUsuario = ""
let emailUsuario = ""

//getInicio
export async function getInicio(req, res) {
  logger.info(`webController.js: getInicio`)
  const title = 'ecomerce'

  try {
    res.render('pages/index', { titulo: title, rol: rolUsuario, nombre: nombreUsuario })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}

//getRegistrarse
export async function getRegistrarse(req, res) {
  logger.info(`webController.js: getRegistrarse`)
  const title = 'Registrarse'
  res.render('pages/registrarse', { titulo: title, rol: rolUsuario, nombre: nombreUsuario })
}

//getlogin
export async function getLogin(req, res) {
  logger.info(`webController.js: getLogin`)
  const title = 'Login'
  res.render('pages/login', { titulo: title, rol: rolUsuario, nombre: nombreUsuario })
}

//postlogin
export async function postLogin(req, res) {
  logger.info(`webController.js: postLogin`)
  emailUsuario = req.body.username;
  const usuario = await usuarios.getUsuario(emailUsuario)
  nombreUsuario = usuario.nombre
  let rolesUsuario = usuario.roles
  if (rolesUsuario.includes("admin")) { rolUsuario = "admin" } else { rolUsuario = "usuario" }
  const title = 'ecomerce'
  const token = jwt.sign({ user: emailUsuario }, jwtOpts.secretOrKey, { expiresIn: jwtOpts.expireIn });
  res.render('pages/index', { titulo: title, rol: rolUsuario, nombre: nombreUsuario })
}

//getLogout
export async function getLogout(req, res) {
  logger.info(`webController.js: getLogout`)
  const title = 'Logout'
  res.render('pages/index', { titulo: title, rol: undefined, nombre: "" })
}

//getfailLogin
export async function getfailLogin(req, res) {
  logger.info(`webController.js: getfailLogin`)
  const title = 'El usuario y/o contraseña ingresada son incorrectas'
  res.render('pages/error', { titulo: title, detalle: undefined, rol: rolUsuario, nombre: nombreUsuario })
}

//getfailRegistro
export async function getfailRegistro(req, res) {
  logger.info(`webController.js: getfailRegistro`)
  const title = 'No fue posible registrar el usuario, intente más tarde o comuniquesé con el administrador.'
  res.render('pages/error', { titulo: title, detalle: undefined, rol: rolUsuario, nombre: nombreUsuario })
}

//getfailRegistro
export async function getSubirArchivo(req, res) {
  logger.info(`webController.js: getSubirArchivo`)
  const title = 'Subir Archivo'
  res.render('pages/subirArchivos', { titulo: title, rol: rolUsuario, nombre: nombreUsuario })
}

//infoServer
export async function infoServer(req, res) {
  logger.info(`web: GET /infoServer `)
  const title = 'ecomerce'
  const info = {
    'argumentos_entrada': process.argv.slice(2),
    'plataforma': process.platform,
    'version_node': process.version,
    'memoria_total_reservada': process.memoryUsage().rss,
    'path_ejecucion': process.execPath,
    'process_id': process.pid,
    'carpeta_proyecto': process.cwd(),
    'cantidad_cpus': cantidadDeCPUs
  }

  try {
    res.render('pages/infoServer', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, info })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}

//mensajesChat
export async function mensajesChat(req, res) {
  logger.info(`webController.js: mensajesChat`)

  try {
    const title = 'Mensajes del Chat'
    const mensajesChatList = await chat.getMensajesChat()
    res.render('pages/chat', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, email: emailUsuario, mensajesChatList })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}

//crudUsuarios
export async function crudUsuarios(req, res) {
  logger.info(`webController.js: crudUsuarios`)

  try {
    const title = 'Usuarios'
    const usuariosList = await usuarios.getUsuarios()
    res.render('pages/crudUsuarios', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, usuariosList })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}

//amUsuario --> alta y modificacion de usuario
export async function amUsuario(req, res) {
  logger.info(`webController.js: amUsuario`)

  try {
    const title = 'AM de Usuario'
    const email = req.params.email
    let usuario = []
    if (email != undefined) { usuario = await usuarios.getUsuario(email) }
    res.render('pages/amUsuario', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, usuario })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}


//usuarioBorrar
export async function usuarioBorrar(req, res) {
  const email = req.params.email
  logger.info(`webController.js: usuarioBorrar - ${email}`)

  try {
    const title = 'Usuarios'
    await usuarios.deleteUsuario(email)
    const usuariosList = await usuarios.getUsuarios()
    res.render('pages/crudUsuarios', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, usuariosList })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}


//crudProducts
export async function crudProducts(req, res) {
  logger.info(`webController.js: crudProducts`)

  try {
    const title = 'Products'
    const productsList = await products.getProducts()
    res.render('pages/crudProducts', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, productsList })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}

//productBorrar
export async function productBorrar(req, res) {
  const id = req.params.id
  logger.info(`webController.js: productBorrar - ${id}`)

  try {
    const title = 'Products'
    await products.deleteProduct(id)
    const productsList = await products.getProducts()
    res.render('pages/crudProducts', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, productsList })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}

//crudCarts
export async function crudCarts(req, res) {
  logger.info(`webController.js: crudCarts`)

  try {
    const title = 'Carts'
    const cartsList = await carts.getCarts()
    res.render('pages/crudCarts', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, cartsList })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}

//cartBorrar
export async function cartBorrar(req, res) {
  const id = req.params.id
  logger.info(`webController.js: cartBorrar - ${id}`)

  try {
    const title = 'Carts'
    await carts.deleteCart(id)
    const cartsList = await carts.getCarts()
    res.render('pages/crudCarts', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, cartsList })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}

//crudOrders
export async function crudOrders(req, res) {
  logger.info(`webController.js: crudOrders`)

  try {
    const title = 'Orders'
    const ordersList = await orders.getOrders()
    res.render('pages/crudOrders', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, ordersList })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}

//orderBorrar
export async function orderBorrar(req, res) {
  const id = req.params.id
  logger.info(`webController.js: orderBorrar - ${id}`)

  try {
    const title = 'Orders'
    await orders.deleteOrder(id)
    const ordersList = await orders.getOrders()
    res.render('pages/crudOrders', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, ordersList })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}

//crudMensajes
export async function crudmMensajes(req, res) {
  logger.info(`webController.js: crudMensajes`)

  try {
    const title = 'Mensajes'
    const mensajesChatList = await chat.getMensajesChat()
    res.render('pages/crudMensajes', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, mensajesChatList })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}

//orderBorrar
export async function mensajeChatBorrar(req, res) {
  const id = req.params.id
  logger.info(`webController.js: mensajeChatBorrar - ${id}`)

  try {
    const title = 'Mensajes de Chat'
    await chat.deleteMensajesChat(id)
    const mensajesChatList = await chat.getMensajesChat()
    res.render('pages/crudMensajes', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, mensajesChatList })
  }
  catch (err) {
    logger.error(err);
    res.status(err.estado).json(err)
  }
}