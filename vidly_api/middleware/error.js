const winston = require('winston');

module.exports = function(err, req, res, next) {
	const { name, message, stack, level } = err;
	winston.error({
		message,
		level,
		meta: { name, message, stack },
	});
	res.status(500).send('SOMETHING FAILED, PLEASE TRY AGAIN');
};
