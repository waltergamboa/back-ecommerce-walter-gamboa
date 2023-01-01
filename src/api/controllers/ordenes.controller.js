const { OrdenesApi } = require("../../services/ordenes/ordenes.service");

class OrdenesController{

    constructor(){
        this.ordenesApi = new OrdenesApi();
    }

    getTimestamp = ()=>{
        return Date.now();
      }

    getAll = async (req, res) => {
       const datos = await this.ordenesApi.getAll();
        res.json(datos)
    }

    getById = async (req, res) => {
        const { id } = req.params;
        const datos = await this.ordenesApi.getById(id);
         res.json(datos)
     }

    save = async (req, res)=>{

        const { email, estado, items } = req.body;

        const obj = {
            timestamp: this.getTimestamp(),
            email,
            estado,
            fyh: this.getTimestamp(),
            items: items
          }

        const respuesta = await this.ordenesApi.save(obj);

        // sacar id

        res.json(respuesta)
    }

    updateById = async (req, res)=>{

        const { id } = req.params;
        const obj = req.body;

        const respuesta = await this.ordenesApi.updateById(id, obj);

        // sacar id

        res.json(respuesta)
    }

    deleteById = async (req, res) => {
        const { id } = req.params;
        const respuesta = await this.ordenesApi.deleteById(id);
        res.json(respuesta)
     }

}

module.exports =  { OrdenesController };