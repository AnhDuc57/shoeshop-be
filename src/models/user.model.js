const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    },
);
const User = mongoose.model('users', userSchema);

module.exports = User;
