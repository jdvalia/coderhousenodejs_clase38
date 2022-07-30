import ChatApi from '../api/ChatApi.js'
import logger from '../logger.js'

const chat = new ChatApi();

//obtenerMensajesChat --> devuelve todos los mensajes del chat
export async function obtenerMensajesChat(req, res) {
    logger.info(`GET api/chat`)
    try{
        const mensajesChatList = await chat.getMensajesChat()
        res.status(200).json(mensajesChatList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//obtenerMensajesChat --> devuelve todos los mensajes del chat
export async function obtenerMensajesChatPorEmail(req, res) {
    let email = req.params.email
    logger.info(`GET api/chat/${email}`)
    try{
        const mensajesChatList = await chat.getMensajesChatPorEmail(email)
        res.status(200).json(mensajesChatList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//agregarMensajesChat --> agrega un nuevo mensaje de chat
export async function agregarMensajesChat(req, res) {
    logger.info(`POST api/chat`)
    try{
        const mensajesChatList = await chat.addMensajeChat(req.body)
        res.status(200).json(mensajesChatList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//borrarMensajeChat --> borrar un mensaje del chat
export async function borrarMensajeChat(req, res) {
    let idMensajeChat = req.params.idMensajeChat;
    logger.info(`DELETE /api/chat/${idMensajeChat}`)
    try{
        const mensajesChatList = await chat.deleteMensajesChat(idMensajeChat)
        res.status(200).json(mensajesChatList)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}