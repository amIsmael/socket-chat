var socket = io();


//leer nombre del url params
var params =  new URLSearchParams( window.location.search );
//si NO trae nombre va pal index a registrarse
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

//creamos el usuario pa manejar más fácil
var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function( resp ){
        console.log('usuarios conectados: ');
        console.log( resp );
    })

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
//socket.emit('crearMensaje', {
//    usuario: 'Ismael',
//    mensaje: 'Hola Mundo'
//}, function(resp) {
//    console.log('respuesta server: ', resp);
//});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


//escuchar entradas y salidas de usuarios al chat

socket.on('listaPersona', function(personas) {

    console.log(personas);

});


//mensajes privados, el cliente escucha por
socket.on('mensajePrivado', function(mensaje){
    console.log('mensaje privado', mensaje);
});