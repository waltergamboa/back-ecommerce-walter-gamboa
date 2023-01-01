const MensajeDto = require("../../models/DTOs/productos.dto");
const { ProductosApi } = require("../../services/productos/productos.service");

class ProductosController{

    constructor(){
        this.productosApi = new ProductosApi();
    }

    getTimestamp = ()=>{
        return Date.now();
      }

    getAll = async (req, res) => {
       const datos = await this.productosApi.getAll();
        res.json(datos)
    }

    getById = async (req, res) => {
        const { id } = req.params;
        const datos = await this.productosApi.getById(id);
         res.json(datos)
     }

     getByCategory = async (req, res) => {
        const { category } = req.params;
        const datos = await this.productosApi.getByCategory(category);
         res.json(datos)
     }

    save = async (req, res)=>{

        const { descripcion, categoria, precio, imagen } = req.body;

     //   const mensajeDto = new MensajeDto(nombre, descripcion, codigo, foto, precio, stock)

        const obj = {
            timestamp: this.getTimestamp(), 
            descripcion, 
            categoria, 
            precio: Number(precio), 
            imagen
          }

        const respuesta = await this.productosApi.save(obj);

        // sacar id

        res.json(respuesta)
    }

    updateById = async (req, res)=>{

        const { id } = req.params;
        const obj = req.body;

        const respuesta = await this.productosApi.updateById(id, obj);

        // sacar id

        res.json(respuesta)
    }

    deleteById = async (req, res) => {
        const { id } = req.params;
        const respuesta = await this.productosApi.deleteById(id);
         res.json(respuesta)
     }

}

module.exports =  { ProductosController };