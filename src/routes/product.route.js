const { Router } = require('express');
const ProductController = require('../controllers/product.controller');
const multer = require('multer');
const { verify } = require('../middleware/auth.middleware');

const upload = multer();
class ProductRoutes {
    path = '/products';
    router = Router();

    productsController = new ProductController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(`${this.path}`, this.productsController.findAll);
        this.router.get(`${this.path}/:id`, this.productsController.findOne);
        this.router.delete(`${this.path}/:id`, verify, this.productsController.delete);
        this.router.post(`${this.path}`, verify, upload.single('image'), this.productsController.save);
        this.router.put(`${this.path}`, verify, upload.single('image'), this.productsController.update);
    }
}
module.exports = ProductRoutes;
