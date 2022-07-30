import axios from 'axios'
import assert from 'assert'
import { crearServidor } from "../src/server.js";

let server

async function conectar({ port = 0 }) {
    return new Promise((resolve, reject) => {
        server = crearServidor().listen(8080, err => {
            if (err) {
                reject(err)
            } else {
                resolve(port)
            }
        })
    })
}

async function desconectar() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

describe('servidor Mongo', () => {

    const url = "http://localhost:8080"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkNC5NbjBpRkxORXJlR0ZLRGNOSXJndUFsd01TTTNpakl0Qi9LWjlOWGRIVjdPbjNsVVhhV1MiLCJyb2xlcyI6WyJhZG1pbiJdLCJ1c2VybmFtZSI6ImVsQWRtaW5pc3RyYWRvciIsIm5vbWJyZSI6IkFuaWJhbCIsImFwZWxsaWRvIjoiQWRtaW4iLCJkaXJlY2Npb24iOiJBZG1pcmFudGUgQnJvd24gMTIzNCIsImZlY2hhTmFjaW1pZW50byI6IjIyLzIvMTA4MCIsInRlbGVmb25vIjoiMTE2NTkyMjkwMSIsImF2YXRhciI6Imh0dHA6Ly9pbWFnZW5lcy9hZG1pbi5wbmciLCJfaWQiOiI2MmMwZWVkNzcyMGE5MzhhMDE4MTQ5NWIifSwiaWF0IjoxNjU4MDIyOTMwLCJleHAiOjE2NTgwMjY1MzB9.3iLRIxe2ZCPd9dpOjDS7Kh1e8va_hIDk6wcF3wmB7gw"
    const username = "jorge@gmail.com"
    const password = "qwertyui"
    const productID = "Z4P4TENN1K3PTKAT"
    const productNuevo = {
        "nombre": "nike",
        "description": "tenis",
        "precio": 180000
    }

    before(async () => {
        await conectar({ port: 8080 })
    })

    after(async () => {
        await desconectar()
    })

    beforeEach(() => { })

    afterEach(() => { })

    describe('LOGIN', () => {
        describe('API GET api/usuarios/login', () => {
            it('loguea al usuario y devuelve el token', async () => {
                const { data } = await axios.post(url + '/api/usuarios/login', {
                    "username": username,
                    "password": password
                })
                assert.ok(data.msg)
            })
        })
    })

    describe('PRODUCTS', () => {
        describe('API GET api/products', () => {
            it('Devuelve todos los products', async () => {
                const { status } = await axios.get(url + '/api/products')
                assert.strictEqual(status, 200)
            })
        })

        describe('API GET api/products/id/{idProduct}', () => {
            it('Devuelve la info del idProduct', async () => {
                const { data } = await axios.get(url + '/api/products/id/' + productID)
                assert.ok(data.id)
                assert.ok(data.nombre)
                assert.ok(data.precio)
                assert.ok(data.stock)
            })
        })

        describe('API GET api/products/id/{idProduct}', () => {
            it('Devuelve la info del idProduct', async () => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                const { data } = await axios.post(url + '/api/products', productNuevo)
                assert.ok(data.id)
                assert.ok(data.nombre)
                assert.ok(data.precio)
                assert.ok(data.stock)
            })
        })

    })

})
