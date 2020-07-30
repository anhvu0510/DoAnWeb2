const Multer = require('multer');
const Path = require('path')

const storage = Multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Public/Upload/Indentify/')
    },
   
    filename: (req, file, cb) => {
        cb(null,`${file.fieldname}-${Date.now()}${Path.extname(file.originalname)}`)
    }
    
})
module.exports = {
    Upload: Multer({ storage: storage })
        .fields([{ name: 'imgFontFile', maxCount: 1 }, {name : 'imgEndFile', maxCount : 1}])
}
