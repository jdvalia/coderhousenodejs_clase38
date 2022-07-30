import UsuariosDao from '../model/daos/UsuariosDao.js';
import UsuarioDto from '../model/dtos/UsuarioDto.js';
import CustomError from '../errores/CustomError.js'
import logger from '../logger.js'
import { enviarEmail } from './notificaciones/email.js'

export default class UsuariosApi {

    constructor() {
        this.usuariosDao = new UsuariosDao();
    }

    async getUsuarios() {
        logger.info(`UsuariosApi.js - getUsuarios`);
        const usuariosObj = await this.usuariosDao.getAll();
        return usuariosObj;
    }

    //obtiene los datos de un usuario segun email ingresado
    async getUsuario(email) {
        logger.info(`UsuariosApi.js - getUsuario(${email})`);
        const usuariosObj = await this.usuariosDao.getByEmail(email);
        return usuariosObj;
    }

    //alta de usuario nuevo
    async crearUsuario(objetoUsuario) {
        logger.info(`UsuariosApi.js - crearUsuario`);
        if (!objetoUsuario.username) throw new CustomError(404, `El campo 'email' es obligatorio `)
        if (!objetoUsuario.password) throw new CustomError(404, `El campo 'password' es obligatorio `)

        try {
            const usuario = new UsuarioDto(objetoUsuario)
            usuario._id = await this.usuariosDao.add(usuario)
            logger.info(`Registro de Usuario Ok `);
            await this.enviarEmailNuevoUsuario(usuario)
            return usuario.get()
        }
        catch (err) {
            logger.error(`Error al crear el usuario: ${err}`);
            throw new CustomError(401, `Error al crear el usuario`, err)
        }
    }

    //deleteOrder
    async deleteUsuario(email) {
        logger.info(`UsuariosApi.js - deleteUsuario`);

        try {
            return await this.usuariosDao.deleteByEmail(email);
        }
        catch (err) {
            logger.error(`Error al borrar el usuario con email: ${email}: ${err}`);
            throw new CustomError(401, `Error al borrar el usuario con email: ${email}`, err)
        }
    }

    //login de usuario
    async login(email, password) {
        logger.info(`UsuariosApi.js - login`)
        try {
            const data = await this.usuariosDao.getByEmail(email)
            const usuario = new UsuarioDto(data)
            if (!usuario.isValidPassword(password))
                return false
            else
                return usuario.get();
        }
        catch (err) {
            logger.error(`Error al loguearse: ${JSON.stringify(err)}`)
            throw new CustomError(401, `Error al loguearse`, err)
        }
    }

    //enviarEmailNuevoUsuario
    async enviarEmailNuevoUsuario(objetoUsuario) {
        logger.info(`UsuariosApi.js - enviarEmailNuevoUsuario`);
        //
        try {
            let correoDestino = 'jorge@gmail.com'
            let asunto = 'Nuevo registro'
            let cuerpo = `<h1> Nuevo Registro </h1>
            <p><strong>Email: </strong>${objetoUsuario.email}</p>
            <p><strong>Username: </strong>${objetoUsuario.username}</p>
            <p><strong>Nombre: </strong>${objetoUsuario.nombre}</p>
            <p><strong>Apellido: </strong>${objetoUsuario.apellido}</p>
            <p><strong>Direccion: </strong>${objetoUsuario.direccion}</p>
            <p><strong>Fecha de Nacimiento: </strong>${objetoUsuario.fechaNacimiento}</p>
            <p><strong>Teléfono: </strong>${objetoUsuario.telefono}</p>
            <p><strong>Avatar: </strong>${objetoUsuario.imagenUrl}</p>
            <p><strong>Roles: </strong>${objetoUsuario.roles}</p>`
            await enviarEmail(correoDestino, asunto, cuerpo)
        } catch (err) {
            logger.error(`Falló el envio de mail - error:${err}`)
        }
    }

    async existeEmail(email) {
        logger.info(`UsuariosApi.js - existeEmail ${email}`);
        try {
            await this.usuariosDao.getByEmail(email);
            return true;
        }
        catch (err) {
            logger.error(`Falló al validar si el email ya existe en la Base de datos - error:${err}`)
            if (err.estado == 404) return false;
            else throw err
        }
    }

    async existeUsername(username) {
        logger.info(`UsuariosApi.js - existeUsername ${username}`);
        try {
            await this.usuariosDao.getByUsername(username);
            return true;
        }
        catch (err) {
            logger.error(`Falló al validar si el username ya existe en la Base de datos - error:${err}`)
            if (err.estado == 404) return false;
            else throw err
        }
    }

}