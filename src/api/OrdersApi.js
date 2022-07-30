import OrdersDao from '../model/daos/OrdersDao.js';
import UsuariosDao from '../model/daos/UsuariosDao.js';
import OrdersDto from '../model/dtos/OrdersDto.js';
import CustomError from '../errores/CustomError.js'
import logger from '../logger.js'
import { enviarEmail } from './notificaciones/email.js'
import { enviarWhatsapp } from './notificaciones/whatsapp.js'
import { enviarSMS } from './notificaciones/sms.js'


export default class OrdersApi {

    constructor() {
        this.ordersDao = new OrdersDao();
        this.usuariosDao = new UsuariosDao();
    }

    async getOrders() {
        try {
            return await this.ordersDao.getAll();
        }
        catch (err) {
            logger.error(`Error al solicitar todos los orders: ${err}`);
            throw new CustomError(401, `Error al solicitar todos los orders`, err)
        }
    }

    async getOrder(idOrder) {
        try {
            return await this.ordersDao.getById(idOrder);
        }
        catch (err) {
            logger.error(`Error al solicitar el order ${idOrder}: ${err}`);
            throw new CustomError(401, `Error al solicitar el order ${idOrder}`, err)
        }
    }

    async getOrdersPorEmail(email) {
        if (!email) throw new CustomError(404, `El campo 'email' es obligatorio `)
        try {
            const ordersObj = await this.ordersDao.getByEmail(email);
            return new OrdersDto(ordersObj);
        }
        catch (err) {
            logger.error(`Error solicitar los orders de un usuario: ${err}`);
            throw new CustomError(401, `Error solicitar los orders de un usuario`, err)
        }
    }

    async addOrder(objeto) {

        try {
            //cargo el order
            const order = new OrdersDto(objeto)
            await this.ordersDao.add(order);
            logger.info(`Registro de order Ok `);
            //obtengo los datos del usuario
            const usuario = await this.usuariosDao.getByEmail(order.email)
            //envio de notificaciones al admin y usuario
            await this.enviarEmailNuevoOrder(order, usuario.nombre, usuario.apellido)
            await this.enviarWhatsappNuevoOrder(order.email, usuario.nombre, usuario.apellido)
            await this.enviarSMSOrderEnProceso(usuario.telefono)
            return order.get();
        }
        catch (err) {
            logger.error(`Error al agregar un order: ${err}`);
            throw new CustomError(401, `Error al agregar un order`, err)
        }
    }

    //deleteOrder
    async deleteOrder(idOrder) {
        try {
            return await this.ordersDao.deleteById(idOrder);
        }
        catch (err) {
            logger.error(`Error al borrar el order ${idOrder}: ${err}`);
            throw new CustomError(401, `Error al borrar el order ${idOrder}`, err)
        }
    }

    //enviarEmailNuevoUsuario
    async enviarEmailNuevoOrder(order, nombre, apellido) {
        try {
            //convierto objeto a array 
            const objetoOrders = order.products
            var arrayOrder = objetoOrders.map(function (o) {
                return Object.keys(o).reduce(function (array, key) {
                    return array.concat([key, o[key]]);
                }, []);
            })
            //armo listado de products para enviar por email 
            let listadoProductsHTML = ""
            for (let i = 0; i < arrayOrder.length; i++) {
                listadoProductsHTML = listadoProductsHTML + "<tr><td>" + arrayOrder[i][1] + "</td><td>" + arrayOrder[i][3] + "</td><td>" + arrayOrder[i][5] + "</td></tr>"
            }

            //armo los datos que voy a enviar por email
            let correoDestino = 'jorge@gmail.com'
            let asunto = `Nuevo order de ${nombre} ${apellido} - ${order.email}`
            let cuerpo = `<h1> Nuevo Order de ${nombre} ${apellido} - ${order.email}</h1>
            <p><strong>Email del usuario: </strong>${order.email}</p>
            <p><strong>Estado del order: </strong>${order.estado}</p>
            <p><strong>Fecha de la compra por el usuario: </strong>${order.fechaPedida}</p>
            <p><strong>Products comprados: </strong></p>
            <p>
            <table border=1>
                <tr>
                    <th>Id Product</th>
                    <th>precio</th>
                    <th>cantidad</th>
                </tr>
                ${listadoProductsHTML}
            </table></p>`
            await enviarEmail(correoDestino, asunto, cuerpo)
        } catch (err) {
            logger.error(`Falló el envio de mail del nuevo order - error:${err}`)
        }
    }

    //enviarWhatsappNuevoOrder
    async enviarWhatsappNuevoOrder(email, nombre, apellido) {
        try {
            let from = 'whatsapp:+14155238886'  // es el celu de twilio que usa whatsapp
            let to = process.env.WHATSAPP_USER_ADMIN // es el celu del User Admin
            let body = `Nuevo order de ${nombre} ${apellido} - ${email}`
            await enviarWhatsapp(from, to, body)
        } catch (err) {
            logger.error(`Falló el envio de whatsapp del nuevo order - error:${err}`)
        }
    }

    //enviarSMSOrderEnProceso
    async enviarSMSOrderEnProceso(telefonoUsuario) {
        try {
            let from = '+12292353979'
            let to = telefonoUsuario
            let body = `Su order ha sido recibido y se encuentra en proceso`
            await enviarSMS(from, to, body)
        } catch (err) {
            logger.error(`Falló el envio de SMS de confirmarción al usuario - error:${err}`)
        }
    }
}
