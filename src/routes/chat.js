import { Router } from 'express'
import * as chatController from '../controller/ChatController.js'
import passport from '../controller/PassportController.js'
import { esAdministrador } from '../controller/UsuariosController.js'
import { mdwValidateSchemaNewMensaje } from "../middleware/chatsMDW.js"

const ChatRoutes = new Router();

//GET '/chat' -> devuelve todos los mensajes
ChatRoutes.get('/',
        passport.authenticate('jwt', { session: false }),
        chatController.obtenerMensajesChat)
//GET '/chat/email' -> devuelve todos los mensajes de un usuario en particular
ChatRoutes.get('/:email',
        passport.authenticate('jwt', { session: false }),
        chatController.obtenerMensajesChatPorEmail)
//POST '/chat' -> alta de nuevo mensaje de chat. Hay que mandar por el body email, tipo, mensaje
ChatRoutes.post('/',
        passport.authenticate('jwt', { session: false }),
        mdwValidateSchemaNewMensaje,
        chatController.agregarMensajesChat)
//DELETE '/chat/:idMensajeChat' -> borra un mensaje del chat x id
ChatRoutes.delete('/:idMensajeChat',
        passport.authenticate('jwt', { session: false }),
        esAdministrador,
        chatController.borrarMensajeChat)

export default ChatRoutes 