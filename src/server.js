const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

class Server {
    app;
    env;
    port;

    constructor(routes) {
        this.app = express();
        this.env = process.env.NODE_ENV || 'development';
        this.port = process.env.PORT || 3333;

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.info(`=================================`);
            console.info(`======= ENV: ${this.env} =======`);
            console.info(`🚀 App listening on the port ${this.port}`);
            console.info(`=================================`);
        });
    }

    getServer() {
        return this.app;
    }
    connectToDatabase() {
        const dbHost = process.env.DB_HOST;
        const dbName = process.env.DB_NAME;
        const dbPort = process.env.DB_PORT;
        mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, (error) => {
            if (error) {
                console.error(error);
            } else console.log('Connect to db successfully');
        });
    }
    initializeMiddlewares() {
        this.app.use(cors({ origin: process.env.ORIGIN }));
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }
    initializeErrorHandling() {
        // this.app.use(errorMiddleware);
    }
}
module.exports = Server;
