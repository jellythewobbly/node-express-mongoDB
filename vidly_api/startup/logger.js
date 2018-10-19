require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function() {
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
};
