require('express-async-errors');
const config = require('config');
const winston = require('winston');
require('winston-mongodb');
const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const app = express();

require('./startup/routes')(app);
require('./startup/db')();

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(
	new winston.transports.MongoDB({ db: 'mongodb://localhost/node_vidly' })
);

process.on('uncaughtException', err => {
	console.error('Error: There was an uncaught exception');
	const { name, message, level, stack } = err;
	winston.error({
		message,
		name,
		level,
		stack,
	});
});

process.on('unhandledRejection', err => {
	console.error('Error: There was an unhandled rejection');
	const { name, message, level, stack } = err;
	winston.error({
		message,
		name,
		level,
		stack,
	});
});

if (!config.get('jwtPrivateKey')) {
	console.error('ERROR: JSON Web Token key is not defined');
	console.log(`Please run 'export default_jwtPrivateKey=exampleSecureKey'`);
	process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}......`));
