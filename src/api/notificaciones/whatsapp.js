import twilio from 'twilio'
import logger from "../../logger.js";

const accountSid = process.env.TWILIO_ACCOUNTSID
const authToken = process.env.TWILIO_AUTHTOKEN

const client = twilio(accountSid, authToken)

export async function enviarWhatsapp(from, to, body) {

    logger.info("Enviando whatsapp con la notificación del nuevo pedido ...")

    const options = {
        body: body,
        from: from, //'whatsapp:+14155238886'
        to: to //'whatsapp:+14155238886'
    }

    try {
        const message = await client.messages.create(options)
        logger.info(message)
    } catch (error) {
        logger.error(err)
    }

}