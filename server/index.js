import express from 'express';
import config from './config/constants';
import './config/database';
import middlewaresConfig from './config/middlewares';
import apiRoutes from './my_modules/index';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome');
});

middlewaresConfig(app);

apiRoutes(app);

app.listen(config.PORT, err => {
    if(err) {
        throw err;
    } else {
        console.log(`
            Server running on port: ${config.PORT}
            ====
            Running on ${process.env.NODE_ENV}
        `);
    }
});