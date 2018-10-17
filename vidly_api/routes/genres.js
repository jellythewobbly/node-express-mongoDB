const express = require('express');
const { Genre, validate } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

router.get('/:id', async (req, res) => {
	const genre = await Genre.findById(req.params.id).catch(err =>
		res.status(404).send('404 NOT FOUND')
	);

	if (!genre) return res.status(404).send('404 NOT FOUND');

	res.send(genre);
});

router.post('/', auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	console.log(req.body);

	const newGenre = new Genre({
		name: req.body.name,
		desc: req.body.desc,
	});

	await newGenre.save();
	res.send(newGenre);
});

router.put('/:id', auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			desc: req.body.desc,
		},
		{ new: true }
	);

	if (!genre) return res.status(404).send('404 NOT FOUND');

	res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
	const genre = await Genre.findByIdAndRemove(req.params.id);

	if (!genre) return res.status(404).send('404 NOT FOUND');

	res.send(genre);
});

module.exports = router;
