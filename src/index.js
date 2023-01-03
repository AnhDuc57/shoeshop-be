const userController = require('./controllers/user.controller');
const ProductRoutes = require('./routes/product.route');
const UserRoutes = require('./routes/user.route');
const Server = require('./server');

const server = new Server([new ProductRoutes(), new UserRoutes()]);

server.listen();
