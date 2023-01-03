const User = require('../models/user.model');
const fs = require('fs');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

class UserController {
    findOne = async (req, res) => {
        try {
            const id = req.params.id;

            const user = await User.findOne({ _id: id });
            return res.status(201).json(user);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ status: 400, message: 'Bad request' });
        }
    };
    register = async (req, res) => {
        try {
            const userClient = req.body;
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(userClient.password, salt);
            console.log(hash);
            const saveUser = new User({
                ...userClient,
                password: hash,
                isAdmin: false,
            });
            await saveUser.save();
            return res.status(201).json(saveUser);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ status: 400, message: 'Bad request' });
        }
    };

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(req.body);
            const user = await User.findOne({ email: email });
            // data
            // thuat toan
            // time
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    const payload = {
                        email,
                        _id: user._id,
                        roles: user.roles,
                    };

                    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.EXP });
                    const originalPlayload = jwt.decode(accessToken);

                    return res
                        .status(200)
                        .json({ accessToken: accessToken, expiresIn: originalPlayload.exp, user: user });
                } else {
                    return res.status(401).json({ status: 401, message: 'Email or password invalid' });
                }
            } else {
                return res.status(402).json({ status: 402, message: 'Email or password invalid' });
            }
        } catch (error) {
            console.error(error);
            return res.status(400).json({ status: 400, message: 'Bad request' });
        }
    };

    update = async (req, res) => {
        try {
            const user = req.body;

            const id = user._id;

            delete user._id;
            console.log(product);
            const updUSer = await User.findOneAndUpdate({ _id: id }, { ...user });

            console.log(updUSer);
            if (updUSer) return res.status(200).json(await User.findOne({ _id: id }));
            else {
                return res.status(300).json({ status: 300, message: 'Can not find user with id: ' + id });
            }
        } catch (error) {
            console.error(error);
            return res.status(400).json({ status: 400, message: 'Bad request' });
        }
    };
    // Product.updateOne({ _id: id },{title:"hello"})
}
module.exports = UserController;
