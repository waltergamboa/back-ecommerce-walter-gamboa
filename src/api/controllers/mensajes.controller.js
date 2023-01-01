//const MensajeDto = require("../../models/DTOs/productos.dto");
const { MensajesApi } = require("../../services/mensajes/mensajes.service");

class MensajesController{

    constructor(){
        this.mensajesApi = new MensajesApi();
    }

    getTimestamp = ()=>{
        return Date.now();
      }

    getAll = async (req, res) => {
       const datos = await this.mensajesApi.getAll();
        res.json(datos)
    }

    getById = async (req, res) => {
        const { id } = req.params;
        const datos = await this.mensajesApi.getById(id);
         res.json(datos)
     }

    save = async (req, res)=>{

        const { email, tipo, fyh, cuerpomensaje } = req.body;

      //  const mensajeDto = new MensajeDto(nombre, descripcion, codigo, foto, precio, stock)

        const obj = {
            email, 
            tipo, 
            fyh, 
            cuerpomensaje
          }

        const respuesta = await this.mensajesApi.save(obj);

        // sacar id

        res.json(respuesta)
    }

    updateById = async (req, res)=>{

        const { id } = req.params;
        const obj = req.body;

        const respuesta = await this.mensajesApi.updateById(id, obj);

        // sacar id

        res.json(respuesta)
    }

    deleteById = async (req, res) => {
        const { id } = req.params;
        const respuesta = await this.mensajesApi.deleteById(id);
         res.json(respuesta)
     }

}

module.exports =  { MensajesController };