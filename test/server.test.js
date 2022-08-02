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
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiam9yZ2VAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkNWloSnhnLmoxTklqeE5BTHA4aHNTdUhaRE1yMnNpZ09hZ1JOTjN2cVMvWDQ0ck9sLzg2LnEiLCJyb2xlcyI6WyJhZG1pbiJdLCJ1c2VybmFtZSI6IkpvcmdlIiwibm9tYnJlIjoiSm9yZ2UiLCJhcGVsbGlkbyI6IlZhbGlhIiwiZGlyZWNjaW9uIjoiQ2FsbGUgNTYiLCJmZWNoYU5hY2ltaWVudG8iOiIwMTAxMDEiLCJ0ZWxlZm9ubyI6IjExMTIzNDU2NzgiLCJhdmF0YXIiOiJqb3JnZS5wbmciLCJfaWQiOiI2MmU0MTI4MWUxM2NjMDNlYWYyNzNhNzEifSwiaWF0IjoxNjU5NDQ5NzkzLCJleHAiOjE2NTk0NTMzOTN9.FnGPyBGg3niW8gf4CWSxLOxyXegKIiosr4RUkD68_gA"
    const username = "jorge@gmail.com"
    const password = "qwertyui"
    const productID = "Y86EUO2HR14JZGR0WIL55O"
    const productNuevo = {
        "nombre": "nike",
        "descripcion": "Confort",
        "precio": 1200,
        "stock": 123
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
