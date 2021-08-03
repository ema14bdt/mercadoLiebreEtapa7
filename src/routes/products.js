// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Requiero el controlador ************
const productsController = require('../controllers/productsController');

/*** Mostrar todos los productos ***/ 
router.get('/', productsController.index); 

/*** Crear un producto ***/ 
router.get('/create/', productsController.create); 
router.post('/create/', productsController.store); 


/*** Detallar un producto ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** Editar un producto ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


/*** Eliminar un producto ***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
