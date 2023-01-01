const { carritosDao: carritosApi } = require("../../models/daos/carritos");

class CarritosApi{

    constructor(){
        //this.productosApi = productosApi();
    }

    async getAll(){
       const datos = await carritosApi.getAll();
        return datos;
    }

    async getById(id){
        const datos = await carritosApi.getById(id);
         return datos;
     }
 
    async save(obj){
        const respuesta = await carritosApi.save(obj);
        return respuesta;
    }

    async updateById(id, obj){
        const respuesta = await carritosApi.updateById(id, obj);
        return respuesta;
    }

    async deleteById(id){
        const respuesta = await carritosApi.deleteById(id);
         return respuesta;
     }        

}

module.exports =  { CarritosApi };