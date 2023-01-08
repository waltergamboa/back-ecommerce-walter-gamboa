// un solo archivo
function postUploadFile(req, res, next) {
  try {
    const { file } = req;
    if (!file) {
      const error = new Error("Por favor suba un archivo");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file);
  } catch (error) {
    res.json(error);
  }
}

// muchos archivos
function postUploadFiles(req, res, next) {
  try {
    const { files } = req;
    if (!files || files.length === 0) {
      const error = new Error("Por favor suba un archivo como mínimo");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(files);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  postUploadFile,
  postUploadFiles,
};
