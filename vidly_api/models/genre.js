const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model(
	'Genre',
	new mongoose.Schema({
		name: {
			type: String,
			minlength: 5,
			required: true,
		},
		desc: {
			type: String,
			minlength: 5,
		},
	})
);

function validateGenre(genre) {
	const schema = {
		name: Joi.string()
			.min(3)
			.required(),
		desc: Joi.string().min(5),
	};
	return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;
