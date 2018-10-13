const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model(
	'User',
	new mongoose.Schema({
		name: {
			type: String,
			minlength: 3,
			required: true,
		},
		email: {
			type: String,
			minlength: 5,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			minlength: 8,
			required: true,
		},
	})
);

const validateUser = user => {
	const schema = {
		name: Joi.string()
			.min(3)
			.required(),
		email: Joi.string()
			.email()
			.min(5)
			.required(),
		password: Joi.string()
			.min(8)
			.required(),
	};

	return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateUser;
