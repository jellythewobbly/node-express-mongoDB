const mongoose = require('mongoose');
const helmet = require('helmet');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
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
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}......`));
