const chalk = require('chalk');

const loggerMiddleware = (req, res, next) => {
    const method = req.method;
    const url = req.originalUrl;
    const timestamp = new Date().toLocaleString();

    console.log(chalk.blue(`${timestamp} - ${method} ${url}`));

    next();
};

module.exports = loggerMiddleware;
