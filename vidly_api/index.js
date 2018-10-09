const mongoose = require('mongoose');
const helmet = require('helmet');
const express = require('express');
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const home = require('./routes/home');

const app = express();

mongoose
	.connect(
		'mongodb://localhost/node_vidly',
		{ useNewUrlParser: true }
	)
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...', err.message));

app.use(express.json());
app.use(helmet());
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}......`));
