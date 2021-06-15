require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { uploadCtr } = require('./upload.controller')
const multer = require('multer')
const app = express()

app.use(cors())
app.use(express.static('uploads'));
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const extensions = file.originalname.split('.').pop();
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${extensions}`)
    }
})

const upload = multer({ storage })

app.post(
    `/upload`,
    upload.single('file'),
    uploadCtr
)

app.get('/', (req, res) => {
    res.send({ a: 1 })
})

app.listen(PORT, () => console.log('Servidor listo corriendo por el puerto ', PORT))