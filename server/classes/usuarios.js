//{         PERSONA ARREGLO
//    id: 'lñsadjfhf-asjdjfj',
//    nombre: 'Ismael',
//    sala: 'videojuegos'
//}

class Usuarios {

    constructor(){
//inicializamos el arreglos de personas conectadas al chat, regresa una persona
        this.personas = [];
    }

//MÉTODOS PARA TRATAR A PERSONAS

    // ADD PERSONA A SALA
    agregarPersona(id, nombre, sala){
        
        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;
    
    }

    //PARA OBTENER INFORACIÓN DE UNA PERSONA POR ID

    getPersona(id){
//js método filter, nos regresa un arreglo o undefine, por eso [0]
        let persona =  this.personas.filter( persona => persona.id === id)[0];
/*   let persona =  this.persona.filter( persona =>{
        return persona.id === id
      })[0];    */

      //si encuentra a alguien nos da objeto, sino undefine o null
      return persona;

    }

    getPersonas(){
        return this.personas;
    }

    getPersonasPorSala( sala ){
        let personasEnSala = this.personas.filter( persona => persona.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id){

        //sacamos a la persona que se va para tener referencia para front
        let personaBorrada = this.getPersona(id);

        //arreglo original = filtrado de todos los que no sean él xD
        this.personas = this.personas.filter( persona => persona.id != id)
        
        return personaBorrada;

    }


}



module.exports = {
    Usuarios
}