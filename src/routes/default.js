import { Router } from 'express'
import { failRoute } from '../controller/DefaultController.js'

const DefaultRoute = new Router();

DefaultRoute.get('/*', failRoute)
DefaultRoute.post('/*', failRoute)
DefaultRoute.put('/*', failRoute)
DefaultRoute.delete('/*', failRoute)

export default DefaultRoute 
