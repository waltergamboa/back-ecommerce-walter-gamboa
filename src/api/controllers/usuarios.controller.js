const MensajeDto = require("../../models/DTOs/productos.dto");
const { UsuariosApi } = require("../../services/usuarios/usuarios.service");

class UsuariosController{

    constructor(){
        this.usuariosApi = new UsuariosApi();
    }

    getTimestamp = ()=>{
        return Date.now();
      }

    getAll = async (req, res) => {
       const datos = await this.usuariosApi.getAll();
        res.json(datos)
    }

    getById = async (req, res) => {
        const { id } = req.params;
        const datos = await this.usuariosApi.getById(id);
         res.json(datos)
     }


    save = async (req, res)=>{

        const { name, email, password } = req.body;

     //   const mensajeDto = new MensajeDto(nombre, descripcion, codigo, foto, precio, stock)

        const obj = {
            name, 
            email, 
            password
          }

        const respuesta = await this.usuariosApi.save(obj);

        // sacar id

        res.json(respuesta)
    }

    updateById = async (req, res)=>{

        const { id } = req.params;
        const obj = req.body;

        const respuesta = await this.usuariosApi.updateById(id, obj);

        // sacar id

        res.json(respuesta)
    }

    deleteById = async (req, res) => {
        const { id } = req.params;
        const respuesta = await this.usuariosApi.deleteById(id);
         res.json(respuesta)
     }

}

module.exports =  { UsuariosController };