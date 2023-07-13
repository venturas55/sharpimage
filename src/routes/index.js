const { Router } = require('express');
const path = require('path');
const funciones= require('../lib/funciones'); 
const router = Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, "prueba.jpg"); //+file.originalname.split('.')[1]
    }
})

const upload = multer({
    storage,
}).single('imagen');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/upload/:originalname', (req, res) => {
    const originalname = req.params;
    console.log(originalname);
    res.render('indexMod',originalname);
});

router.post('/upload', upload, (req, res) => {
    console.log(req.file);
    res.redirect('/upload/'+req.file.originalname);
});

router.get('/tratar', (req, res) => {
    const originalname = req.params;
    funciones.tratarGrey();
    res.redirect('/');
});


module.exports = router;