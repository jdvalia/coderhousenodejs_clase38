import NUID from 'nuid'
import moment from 'moment'

export default class CartDto {

    _id;
    id;
    estado;
    emailUsuario;
    products;
    fechaUltModif;
    direccionEntrega;

    constructor({ _id, id, estado, emailUsuario, products, fechaUltModif, direccionEntrega }) {

        if (_id === undefined) {
            this._id = undefined;
            this.id = NUID.next();
            this.estado = "abierto"
            this.fechaUltModif = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
        }
        else {
            this._id = _id;
            this.id = id;
            this.estado = estado
            this.fechaUltModif = fechaUltModif
        }

        this.emailUsuario = emailUsuario;
        this.products = products;
        this.direccionEntrega = direccionEntrega;
    }

    get() {
        return this
    }

}