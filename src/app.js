import logger from './logger.js'
import { crearServidor } from './server.js'
import config from '../config/config.js'
import cluster from 'cluster'
import os from 'os'

const PORT = config.PORT
const modo = config.MODO
const app = crearServidor()

// PARTE WEB
import { createServer } from "http";
import { Server } from 'socket.io'
const httpServer = createServer(app);
const io = new Server(httpServer)

import MySocket from './socket.js';
const mySocket = new MySocket(io)
mySocket.on()
// --------------------------------------------


if (modo === "CLUSTER") {

    const cantidadDeCPUs = os.cpus().length

    if (cluster.isPrimary) {/* MASTER */
        logger.info(`Cantidad de CPUS: ${cantidadDeCPUs}`)
        logger.info(`PID MASTER: ${process.pid}`)
        logger.info(`MODO: ${modo}`)

        for (let i = 0; i < cantidadDeCPUs; i++) {
            cluster.fork()
        }
        cluster.on('exit', worker => {
            logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
            cluster.fork()
        })
    } else { /* WORKERS */
        const server = httpServer.listen(PORT, () => {
            logger.info(`Http server listening on port ${server.address().port} - PID WORKER ${process.pid}`)
        })
        server.on("error", error => logger.error(`Server error ${error}`))
    }

} else {
    const server = httpServer.listen(PORT, () => {
        logger.info(`Http server listening on port ${server.address().port} - PID WORKER ${process.pid} - MODO ${modo}`)
    })
    server.on("error", error => logger.error(`Server error ${error}`))
}
