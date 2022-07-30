import twilio from 'twilio'
import logger from "../../logger.js";

const accountSid = process.env.TWILIO_ACCOUNTSID
const authToken = process.env.TWILIO_AUTHTOKEN

const client = twilio(accountSid, authToken)

export async function enviarSMS(from, to, body) {

    logger.info("Enviando sms con la notificación del pedido en proceso al usuario ...")

    const options = {
        body: body,
        from: from,
        to: to
    }

    try {
        const message = await client.messages.create(options)
        logger.info(message)
    } catch (error) {
        logger.error(err)
    }

}