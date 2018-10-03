const express = require('express');
const router = express.Router();

const genres = [
	{ _id: 1, name: 'Action', desc: 'ACTION MOVIES' },
	{ _id: 2, name: 'Comedy', desc: 'COMEDY MOVIES' },
	{ _id: 3, name: 'Thriller', desc: 'THRILLER MOVIES' }
];

router.get('/', (req, res) => {
	res.send(genres);
});

router.get('/:id', (req, res) => {
	const genre = genres.find(i => i._id === parseInt(req.params.id));
	if (!genre) return res.status(404).send('404 NOT FOUND');
	res.send(genre);
});

router.post('/', (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const newGenre = {
		_id: genres.length + 1,
		name: req.body.name,
		desc: req.body.desc
	};

	genres.push(newGenre);
	res.send(newGenre);
});

router.put('/:id', (req, res) => {
	const genre = genres.find(i => i._id === parseInt(req.params.id));
	if (!genre) return res.status(404).send('404 NOT FOUND');

	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	genre.name = req.body.name;
	genre.desc = req.body.desc;
	res.send(genre);
});

router.delete('/:id', (req, res) => {
	const genre = genres.find(i => i._id === parseInt(req.params.id));
	if (!genre) return res.status(404).send('404 NOT FOUND');

	const index = genres.indexOf(genre);
	res.send(genres.splice(index, 1));
});

function validate(genre) {
	const schema = {
		name: Joi.string()
			.min(3)
			.required(),
		desc: Joi.string()
			.min(5)
			.required()
	};
	return Joi.validate(genre, schema);
}

module.exports = router;
