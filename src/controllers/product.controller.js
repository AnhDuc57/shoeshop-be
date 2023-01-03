const Product = require('../models/product.model');
const fs = require('fs');
class ProductController {
    findAll = async (req, res) => {
        try {
            const products = await Product.find();
            return res.status(201).json(products);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ status: 400, message: 'Bad request' });
        }
    };

    findOne = async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findOne({ _id: id });
            return res.status(201).json(product);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ status: 400, message: 'Bad request' });
        }
    };
    save = async (req, res) => {
        try {
            const productClient = req.body;
            const file = req.file;
            fs.createWriteStream('public/images/' + file.originalname).write(file.buffer);
            const saveProduct = new Product({
                ...productClient,
                image: `http://localhost:3001/images/${file.originalname}`,
            });
            await saveProduct.save();
            return res.status(201).json(saveProduct);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ status: 400, message: 'Bad request' });
        }
    };
    delete = async (req, res) => {
        try {
            const id = req.params.id;
            console.log(id);
            const delProduct = await Product.findOneAndDelete({ _id: id });
            if (delProduct) return res.status(200).json(delProduct);
            else {
                return res.status(300).json({ status: 300, message: 'Can not find product with id: ' + id });
            }
        } catch (error) {
            console.error(error);
            return res.status(400).json({ status: 400, message: 'Bad request' });
        }
    };
    update = async (req, res) => {
        try {
            const file = req.file;
            const product = req.body;

            const id = product._id;
            if (file) {
                fs.createWriteStream('public/images/' + file.originalname).write(file.buffer);
                product.image = `http://localhost:3001/images/${file.originalname}`;
            } else {
                delete product.image;
            }

            delete product._id;
            console.log(product);
            const updProduct = await Product.findOneAndUpdate({ _id: id }, { ...product });

            console.log(updProduct);
            if (updProduct) return res.status(200).json(await Product.findOne({ _id: id }));
            else {
                return res.status(300).json({ status: 300, message: 'Can not find product with id: ' + id });
            }
        } catch (error) {
            console.error(error);
            return res.status(400).json({ status: 400, message: 'Bad request' });
        }
    };
    // Product.updateOne({ _id: id },{title:"hello"})
}
module.exports = ProductController;
