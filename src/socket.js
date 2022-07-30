import logger from './logger.js'
import chatApi from './api/ChatApi.js'

const chat = new chatApi();

export default class MySocket {
    constructor(io) {
        this.io = io;
    }
    on() {
        this.io.on('connection', async socket => {
            logger.info(`Se conecto al socket on connection`)

            // LISTADO DE MENSAJES DEL CHAT
            let listadoTodosLosMensajesChat = []
            socket.emit('listadoMensajesChat', listadoTodosLosMensajesChat)/* Envio los mensajes al cliente que se conectó */
            socket.on('nuevoMensajeChat', async data => { /* Escucho los mensajes enviado por el cliente y se los propago a todos */
                logger.info(`socket.on nuevoMensajeChat`)
                listadoTodosLosMensajesChat = await chat.addMensajeChat(data)
                this.io.sockets.emit('listadoMensajesChat', listadoTodosLosMensajesChat)
            })
        })
    }
}