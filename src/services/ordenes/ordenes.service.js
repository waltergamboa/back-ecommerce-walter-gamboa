const { ordenesDao: ordenesApi } = require("../../models/daos/ordenes");
// mensajes
const { mailNuevaOrden } = require("../../helpers/mensajes/mail.mensaje");

class OrdenesApi{

    constructor(){
        //this.productosApi = productosApi();
    }

    async getAll(){
       const datos = await ordenesApi.getAll();
        return datos;
    }

    async getById(id){
        const datos = await ordenesApi.getById(id);
         return datos;
     }
 
    async save(obj){
        const respuesta = await ordenesApi.save(obj);
        if(respuesta){
            ;(async ()=>{
                try {
                    const res = await mailNuevaOrden("username", "waltergamboa@gmail.com");
                 } catch (error) {
                    loggerError.error("Error en el envio de un mail: %s", error)
                 }
            })();
        }
        return respuesta;
    }

    async updateById(id, obj){
        const respuesta = await ordenesApi.updateById(id, obj);
        return respuesta;
    }

    async deleteById(id){
        const respuesta = await ordenesApi.deleteById(id);
         return respuesta;
     }        

}

module.exports =  { OrdenesApi };