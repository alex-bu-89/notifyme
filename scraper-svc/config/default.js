module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    serviceName: 'express-typescript-boilerplate',
    logger: {
        level: 'trace',
    },
    db: {
        host: 'mongodb://localhost:27017',
        name: 'mydb',
    },
}
