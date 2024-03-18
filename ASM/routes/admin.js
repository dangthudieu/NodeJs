const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/images/product/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const productsController = require('../controllers/products');
const router = express.Router();
// /admin/add-product => GET
router.get('/product/list', productsController.getProducts);
router.get('/layouts/dashboard', productsController.getDashBoard)
router.get('/product/add', productsController.getAddProduct)
router.get('/product/detail/:id', productsController.getDetailProAdmin)
router.post('/product/add',upload.single('image'), productsController.postAddProduct);

module.exports = router;