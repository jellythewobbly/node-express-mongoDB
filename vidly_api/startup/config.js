const config = require('config');

module.exports = function() {
	if (!config.get('jwtPrivateKey')) {
		console.error('ERROR: JSON Web Token key is not defined');
		console.log(`Please run 'export default_jwtPrivateKey=exampleSecureKey'`);
		throw new Error('ERROR: JSON Web Token key is not defined');
	}
};
