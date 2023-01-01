const { usuariosDao: usuariosApi } = require("../../models/daos/usuarios");

class UsuariosApi{
    constructor(){
    }

    async getAll(){
       const datos = await usuariosApi.getAll();
        return datos;
    }

    async getById(id){
        const datos = await usuariosApi.getById(id);
         return datos;
     }
 
     async getByCategory(category){
        const datos = await usuariosApi.getByCategory(category);
         return datos;
     }

    async save(obj){
        const respuesta = await usuariosApi.save(obj);
        return respuesta;
    }

    async updateById(id, obj){
        const respuesta = await usuariosApi.updateById(id, obj);
        return respuesta;
    }

    async deleteById(id){
        const respuesta = await usuariosApi.deleteById(id);
         return respuesta;
     }    

}

module.exports =  { UsuariosApi };


