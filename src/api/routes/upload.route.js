const express = require("express");
const { Router } = express;
const {
  postUploadFile,
  postUploadFiles,
} = require("../controllers/upload.controller");
const { uploadSingle, uploadMulti } = require("../../middlewares/upload/upload.middleware");

const routerUploads = Router();

routerUploads.post("/uploadfile", uploadSingle, postUploadFile);
routerUploads.post("/uploadfiles", uploadMulti, postUploadFiles);

module.exports = routerUploads;
