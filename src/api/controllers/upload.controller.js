// un solo archivo
function postUploadFile(req, res, next) {
    //upload.single('myFile');

    const { file } = req
    // console.log(file)
    // console.log(Date.now())
    if (!file) {
        const error =   new Error('Por favor suba un archivo')
        error.httpStatusCode = 400  
        return next(error)
    }
    res.send(file)
};

// muchos archivos
function postUploadFiles(req, res, next){
  //  upload.array('myFiles')
    const { files } = req
    // console.log(files)
    if (!files || files.length === 0) {
        const error =   new Error('Por favor suba un archivo como mínimo')
        error.httpStatusCode = 400  
        return next(error)
    }
    res.send(files)
};

module.exports  = {
    postUploadFile,
    postUploadFiles
}