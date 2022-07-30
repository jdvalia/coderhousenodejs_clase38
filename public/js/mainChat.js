//------------------------------------------------------------
//--------------------  DEFINICIONES -------------------------
const socket = io.connect();

//------------------------------------------------------------
//----------  FUNCIONES PARA EL CHAT -------------------------
//buscarPlantillaMensajes
function buscarPlantillaMensajes() {
    return fetch('/plantillas/listadoMensajesChat.ejs')
        .then(respuesta => respuesta.text())
}

//armarHTML del chat
function armarHTMLChat(plantilla, mensajesChat) { //mantener el nombre mensajesChat como dice plantilla ejs
    const render = ejs.compile(plantilla);
    const html = render({ mensajesChat })
    return html
}

//agregarMensaje
function agregarMensaje(e) {
    const mensaje = {
        email: document.getElementById('email').value,
        tipo: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value
    };
    document.getElementById('listadoDeMensajes').value = ''
    socket.emit('nuevoMensajeChat', mensaje);
    return false;
}

//------------------------------------------------------------
//--------------------  PRINCIPAL-----------------------------
socket.on('listadoMensajesChat', async mensajesChat => {
    const plantilla = await buscarPlantillaMensajes()
    const html = armarHTMLChat(plantilla, mensajesChat)
    document.getElementById('listadoDeMensajes').innerHTML = html;
});
//------------------------------------------------------------

