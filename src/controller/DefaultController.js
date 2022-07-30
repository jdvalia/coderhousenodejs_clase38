import logger from '../logger.js'

export function failRoute(req, res) {
  const { originalUrl, method } = req
    const title = "No existe la ruta "+ method+" "+originalUrl;    
    logger.warn(`No existe la ruta ${method} ${originalUrl}`)
    res.status(404).json( { titulo: title });
  }