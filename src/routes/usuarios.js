import { Router } from 'express'
import passport from '../controller/PassportController.js'
import * as userController from '../controller/UsuariosController.js'
import { mdwValidateSchemaNewUsuario } from "../middleware/usuariosMDW.js"

const UsersRoutes = new Router();

//GET '/usuarios' --> obtiene todos los usuarios
UsersRoutes.get('/', userController.obtenerUsuarios);

//POST /registro --> para dar de alta un nuevo usuario
UsersRoutes.post('/registro',
    mdwValidateSchemaNewUsuario,
    passport.authenticate('registro', {
        failureRedirect: '/api/usuarios/failRegister'
    }),
    userController.successRegister
);
UsersRoutes.get('/failRegister', userController.failRegister);
UsersRoutes.get('/successRegister', userController.successRegister);

//POST '/login' --> recibe email y password del usuario
UsersRoutes.post('/login',
    passport.authenticate('login', { failureRedirect: '/api/usuarios/failLogin' }),
    userController.successLogin
);
UsersRoutes.get('/failLogin', userController.failLogin);
UsersRoutes.get('/successLogin', userController.successLogin);

//GET '/logout' --> se desloguea
UsersRoutes.get('/logout', userController.logout);


UsersRoutes.delete('/:email', userController.borrarUsuario);

export default UsersRoutes 