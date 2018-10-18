require('express-async-errors');
const config = require('config');
const mongoose = require('mongoose');
const helmet = require('helmet');
const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const users = require('./routes/users');
const auth = require('./routes/auth');
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const home = require('./routes/home');
const error = require('./middleware/error');

const app = express();

if (!config.get('jwtPrivateKey')) {
	console.error('ERROR: JSON Web Token is not defined');
	console.log(`Please run 'export default_jwtPrivateKey=exampleSecureKey'`);
	process.exit(1);
}

mongoose
	.connect(
		'mongodb://localhost/node_vidly',
		{ useNewUrlParser: true }
	)
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...', err.message));

app.use(express.json());
app.use(helmet());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/', home);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}......`));
