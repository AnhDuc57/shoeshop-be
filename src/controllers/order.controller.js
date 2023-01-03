const Order = require('../models/order.model');

class OrderController {
    findAll = async (req, res) => {
        try {
            const orders = await Order.find();
            return res.status(201).json(orders);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ status: 400, message: 'Bad request' });
        }
    };

    findOne = async (req, res) => {
        try {
            const id = req.params.id;
            const order = await Order.findOne({_id: id});
            return res.status(201).json(order);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ status: 400, message: 'Bad request' });
        }
    };
    save = async (req, res) => {
        try {
            const ordertClient = req.body;

            const saveOrder = await Order.create(ordertClient);
            return res.status(201).json(saveOrder);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ status: 400, message: 'Bad request' });
        }
    };
    // Product.updateOne({ _id: id },{title:"hello"})
}
module.exports = ProductController;
