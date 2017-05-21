import express from 'express';
import config from './config/constants';
import './config/database';
import middlewaresConfig from './config/middlewares';

console.log(typeof middlewaresConfig);
const app = express();

middlewaresConfig(app);

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