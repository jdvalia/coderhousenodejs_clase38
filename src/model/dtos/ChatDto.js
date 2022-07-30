import NUID from 'nuid'
import moment from 'moment'

export default class ChatDto {
    _id;
    id;
    email;
    tipo;
    fechaHora;
    mensaje; 

    constructor({ _id, id, email, tipo, fechaHora, mensaje}) {

        if (_id === undefined) {
            this._id = undefined;
            this.id = NUID.next();
            this.fechaHora = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
        }
        else {
            this._id = _id;
            this.id = id;
            this.fechaHora = fechaHora
        }

        this.email = email;
        this.tipo = tipo;
        this.mensaje = mensaje;
    }

    get() {
        return this
    }

}

