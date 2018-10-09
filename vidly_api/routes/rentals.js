const express = require('express');
const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');

const router = express.Router();

router.get('/', async (req, res) => {
	const rentals = await Rental.find().sort('-dateOut');
	res.send(rentals);
});

router.get('/:id', async (req, res) => {
	const rental = await Rental.findById(req.params.id).catch(err =>
		res.status(404).send('404 RENTAL NOT FOUND')
	);

	if (!rental) res.status(404).send('404 RENTAL NOT FOUND');

	res.send(rental);
});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(req.body.customerId);
	const movie = await Movie.findById(req.body.movieId);

	if (!customer || !movie) return res.status(400).send('INVALID REQUEST');

	if (movie.numberInStock === 0)
		return res.status(400).send('ERROR, MOVIE IS NOT IN STOCK');

	let newRental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone,
			isGold: customer.isGold,
		},
		movie: {
			_id: movie._id,
			title: movie.title,
			dailyRentalRate: movie.dailyRentalRate,
		},
	});

	newRental = await newRental.save();

	movie.numberInStock -= 1;
	movie.save();

	res.send(newRental);
});

router.put('/:id', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(req.body.customerId);
	const movie = await Movie.findById(req.body.movieId);

	if (!customer || !movie) return res.status(400).send('INVALID REQUEST');

	const rental = await Rental.findByIdAndUpdate(
		req.params.id,
		{
			customer: {
				_id: customer._id,
				name: customer.name,
				phone: customer.phone,
				isGold: customer.isGold,
			},
			movie: {
				_id: movie._id,
				title: movie.title,
				dailyRentalRate: movie.dailyRentalRate,
			},
		},
		{ new: true }
	);

	if (!rental) return res.status(404).send('404 NOT FOUND');

	res.send(rental);
});

module.exports = router;
