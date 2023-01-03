const { Router } = require('express');
const UserController = require('../controllers/user.controller');

class UserRoutes {
    path = '/users';
    router = Router();

    userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(`${this.path}/register`, this.userController.register);
        this.router.post(`${this.path}/login`, this.userController.login);
    }
}
module.exports = UserRoutes;
