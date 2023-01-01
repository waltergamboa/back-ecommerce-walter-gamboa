const express = require("express");
const { Router } = express;
const { postUploadFile, postUploadFiles } = require("../controllers/upload.controller")
const { uploadSingle, uploadMulti } = require("../controllers/upload");
// const multer = require('multer')

// const getTimestamp = ()=>{
//   return Date.now();
// }

// const storage = multer.diskStorage({
//     destination: (req, _file, cb) => {
//         cb(null, 'public/uploads')
//     },
//     filename: (req, file, cb) => {
//         // console.dir(cb)
//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// })

// const upload = multer({ storage })


/* -------------------------------------------------------------------------- */
/*                              router Uploads                                */
/* -------------------------------------------------------------------------- */
const routerUploads = Router();
// un solo archivo
// routerUploads.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//     const { file } = req
//     // console.log(file)
//     // console.log(Date.now())
//     if (!file) {
//         const error =   new Error('Por favor suba un archivo')
//         error.httpStatusCode = 400  
//         return next(error)
//     }
//     res.send(file)
// })
// // muchos archivos
// routerUploads.post('/uploadfiles', upload.array('myFiles'), (req, res, next)=>{
//     const { files } = req
//     // console.log(files)
//     if (!files || files.length === 0) {
//         const error =   new Error('Por favor suba un archivo como mínimo')
//         error.httpStatusCode = 400  
//         return next(error)
//     }
//     res.send(files)
//} )

routerUploads.post('/uploadfile', uploadSingle, postUploadFile);
routerUploads.post('/uploadfiles', uploadMulti, postUploadFiles);


module.exports  = routerUploads;