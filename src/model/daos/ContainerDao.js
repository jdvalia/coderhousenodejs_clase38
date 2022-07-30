import { MongoClient } from 'mongodb';
import logger from '../../logger.js'
import CustomError from '../../errores/CustomError.js'

const mongo_url = process.env.MONGO_URL
const base = process.env.MONGO_BASE

const client = new MongoClient(mongo_url, { serverSelectionTimeOutMS: 5000 });

await client.connect();

export default class ContainerDao {

    constructor(collection) {
        this.collectionName = collection
        this.collection = client.db(base).collection(collection)
        logger.info(`Mongo Base:${base} collection: ${collection} instanciada`)
    }

    async getAll() {
        try {
            const array = await this.collection.find().toArray()
            return array
        }
        catch (err) {
            logger.error(err)
            throw new CustomError(500, `Error al tratar de rescatar los datos de ${this.collectionName}`, err)
        }
    }

    async getById(query) {
        console.log(query)
        let respuesta
        try {
            respuesta = await this.collection.findOne(query);
        }
        catch (err) {
            logger.error(err)
            throw new CustomError(500, `Error cuando itentamos obtener por ID ${this.collectionName}`, err)
        }

        if (!respuesta) {
            throw new CustomError(404, `Este Documento no fue encontrado en esta coleccion ${this.coleccionName} con estos datos ${JSON.stringify(query)}`)
        }
        return respuesta
    }

    async add(data) {
        try {
            const { insertedId } = await this.collection.insertOne(data)
            return insertedId;
        }
        catch (err) {
            logger.error(err)
            throw new CustomError(500, `Error al querer actualizar la BD ${this.collectionName}`, err)
        }
    }

    async deleteById(query) {

        await this.collection.deleteOne(query, function (err, obj) {
            if (err) {
                logger.error(err)
                throw new CustomError(500, `Error al querer borrar articulos en la BD ${this.collectionName}`, err)
            }
        });
    }

    async listByQuery(query) {
        try {
            const array = await this.collection.find(query).toArray()
            return array
        }
        catch (err) {
            throw new CustomError(500, `Error al querer rescatar info de la BD ${this.coleccionName}`, err)
        }

    }

}
