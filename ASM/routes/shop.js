const express = require('express');
const shopController = require('../controllers/products');
const router = express.Router();
// /admin/add-product => GET
router.get('/', shopController.getShop);
router.get('/client/product/list' ,shopController.getProductsList)
router.get('/client/product/detail/:id', shopController.getDetailPro)
router.get('/client/product/list/:id', shopController.getProductsByCategory);

module.exports = router;