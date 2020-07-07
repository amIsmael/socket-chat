const { io } = require('../server');
const { Usuarios } =  require('../classes/usuarios');
const { crearMensaje } =  require('../utilidades/utilidades');

const usuarios = new Usuarios();


/*el objeto "client" tiene muchas propiedades para trabajar 
(emit, on , tiene un id por cada cliente conectado etc...) */
io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('entrarChat', (data, callback) => {
        
        if(!data.nombre || !data.sala){
            return callback({
                eror:true,
                mensaje: 'el nombre/sala es necesario'
            });
        }

        //para conectar a un usuario a una sala
        client.join(data.sala);

        let personas = usuarios.agregarPersona( client.id, data.nombre, data.sala);

        //cuando un usuario se une al chat manda evento
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala) );
        
        
        callback(personas);

        
    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje =  crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit( 'crearMensaje', mensaje );


    });


    client.on('disconnect', () => {
    
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));

        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala) );



    
    });


    //Mensaje privados, el servidor escucha/espera por
    client.on('mensajePrivado', data =>{
        
        let persona =  usuarios.getPersona( client.id );

        //ojo aquí, para mandar a un usuario en específico, solo agregamos el "to(...)"
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje( persona.nombre, data.mensaje) );
        

    });



});

