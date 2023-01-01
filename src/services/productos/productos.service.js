const { productosDao: productosApi } = require("../../models/daos/productos");

class ProductosApi{
    constructor(){
    }

    async getAll(){
       const datos = await productosApi.getAll();
        return datos;
    }

    async getById(id){
        const datos = await productosApi.getById(id);
         return datos;
     }
 
     async getByCategory(category){
        const datos = await productosApi.getByCategory(category);
         return datos;
     }

    async save(obj){
        const respuesta = await productosApi.save(obj);
        return respuesta;
    }

    async updateById(id, obj){
        const respuesta = await productosApi.updateById(id, obj);
        return respuesta;
    }

    async deleteById(id){
        const respuesta = await productosApi.deleteById(id);
         return respuesta;
     }    

}

module.exports =  { ProductosApi };


