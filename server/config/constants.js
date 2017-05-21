const devConfig = {
    MONGO_URL: 'mongodb://localhost:27017/nodejsrestapi-dev'
};

const testConfig = {
    MONGO_URL: 'mongodb://localhost:27017/nodejsrestapi-test'
};

const prodConfig = {
    MONGO_URL: 'mongodb://localhost:27017/nodejsrestapi-prod'
};

const defaultConfig = {
    PORT: process.env.PORT || 4500
};

const envConfig = (env) => {
    switch(env) {
        case 'development':
            return devConfig;
        case 'test':
            return testConfig;
        default: 
            return prodConfig;
    }
}

export default {
    ...defaultConfig,
    ...envConfig(process.env.NODE_ENV),
}