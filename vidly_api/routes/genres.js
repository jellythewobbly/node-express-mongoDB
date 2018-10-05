const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const Genre = mongoose.model(
	'Genre',
	new mongoose.Schema({
		name: {
			type: String,
			minlength: 5,
			required: true
		},
		desc: {
			type: String,
			minlength: 5
		}
	})
);

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

router.post('/', async (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	console.log(req.body);

	let newGenre = new Genre({
		name: req.body.name,
		desc: req.body.desc
	});

	newGenre = await newGenre.save();
	res.send(newGenre);
});

router.put('/:id', async (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			desc: req.body.desc
		},
		{ new: true }
	);

	if (!genre) return res.status(404).send('404 NOT FOUND');

	res.send(genre);
});

router.delete('/:id', async (req, res) => {
	const genre = await Genre.findByIdAndRemove(req.params.id);

	if (!genre) return res.status(404).send('404 NOT FOUND');

	res.send(genre);
});

function validateGenre(genre) {
	const schema = {
		name: Joi.string()
			.min(3)
			.required(),
		desc: Joi.string().min(5)
	};
	return Joi.validate(genre, schema);
}

module.exports = router;
