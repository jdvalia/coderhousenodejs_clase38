import NUID from 'nuid'
import moment from 'moment'

export default class OrdersDto {
    _id;
    id;
    email;
    products;
    estado; //pendiente, procesando, entregado
    fechaPedida; //fecha que se hizo el order de compra

    constructor({ _id, id, email, products, estado, fechaPedida }) {

        if (_id === undefined) {
            this._id = undefined;
            this.id = NUID.next();
            this.estado = "generada"
            this.fechaPedida = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
        }
        else {
            this._id = _id;
            this.id = id;
            this.estado = estado
            this.fechaPedida = fechaPedida
        }

        this.email = email;
        this.products = products;
    }

    get() {
        return this
    }

}