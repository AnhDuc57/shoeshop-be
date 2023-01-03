const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        title: String,
        image: String,
        description: String,
        price: Number,
        colors: {
            type: Array,
        },
        sizes: {
            type: Array,
        },
    },
    {
        timestamps: true,
    },
);
const Product = mongoose.model('products', productSchema);

module.exports = Product;
