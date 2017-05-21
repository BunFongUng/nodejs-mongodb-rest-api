import mongoose from 'mongoose';
import config from './constants';

mongoose.Promise = global.Promise;

try {
    mongoose.connect(config.MONGO_URL);
} catch (err) {
    mongoose.createConnection(config.MONGO_URL);
}

mongoose.connection
.once('open', () => console.log('MongoDB running'))
.on('error', err => {
    throw err;
});