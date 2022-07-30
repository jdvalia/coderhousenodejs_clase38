import NUID from 'nuid'
import moment from 'moment'

export default class ProductDto {

    _id;
    id;
    fechaHora;
    nombre;
    descripcion;
    precio;
    stock;
    categoria;

    constructor({ _id, id, fechaHora, nombre, descripcion, precio, stock, categoria }) {


        if (_id === undefined) {
            this._id = undefined;
            this.id = NUID.next();
            this.fechaHora = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
        }
        else {
            this._id = _id
            this.id = id;
            this.fechaHora = fechaHora;
        }

        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
    }

    get() {
        return this
    }

    getforCart() {
        return {
            id: this.id,
            fechaHora: this.fechaHora,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            stock: this.stock,
            categoria: this.categoria,
        }
    }

}