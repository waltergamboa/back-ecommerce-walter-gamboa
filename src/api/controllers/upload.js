const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, _file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        // console.dir(cb)
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploadSingle = multer({ storage }).single('myFile');

const uploadMulti = multer({ storage }).array('myFiles');

module.exports = {
    uploadSingle,
    uploadMulti
}