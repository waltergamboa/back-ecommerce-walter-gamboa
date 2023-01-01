const { mensajesDao: mensajesApi } = require("../../models/daos/mensajes");

class MensajesApi{
    constructor(){
    }

    async getAll(){
       const datos = await mensajesApi.getAll();
        return datos;
    }

    async getById(id){
        const datos = await mensajesApi.getById(id);
         return datos;
     }
 
    async save(obj){
        const respuesta = await mensajesApi.save(obj);
        return respuesta;
    }

    async updateById(id, obj){
        const respuesta = await mensajesApi.updateById(id, obj);
        return respuesta;
    }

    async deleteById(id){
        const respuesta = await mensajesApi.deleteById(id);
         return respuesta;
     }    

}

module.exports =  { MensajesApi };