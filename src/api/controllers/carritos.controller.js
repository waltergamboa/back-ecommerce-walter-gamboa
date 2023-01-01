const { CarritosApi } = require("../../services/carritos/carritos.service");

class CarritosController{

    constructor(){
        this.carritosApi = new CarritosApi();
    }

    getTimestamp = ()=>{
        return Date.now();
      }

    getAll = async (req, res) => {
       const datos = await this.carritosApi.getAll();
        res.json(datos)
    }

    getById = async (req, res) => {
        const { id } = req.params;
        const datos = await this.carritosApi.getById(id);
         res.json(datos)
     }

    save = async (req, res)=>{

        const { email, direccionentrega, items } = req.body;

        const obj = {
            timestamp: this.getTimestamp(),
            email,
            direccionentrega,
            fyh: this.getTimestamp(),
            items: items
          }

        const respuesta = await this.carritosApi.save(obj);

        // sacar id

        res.json(respuesta)
    }

    updateById = async (req, res)=>{

        const { id } = req.params;
        const obj = req.body;

        const respuesta = await this.carritosApi.updateById(id, obj);

        // sacar id

        res.json(respuesta)
    }

    deleteById = async (req, res) => {
        const { id } = req.params;
        const respuesta = await this.carritosApi.deleteById(id);
        res.json(respuesta)
     }

}

module.exports =  { CarritosController };