const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
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
	isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{ _id: this._id, email: this.email, isAdmin: this.isAdmin },
		config.get('jwtPrivateKey')
	);
	return token;
};

const User = mongoose.model('User', userSchema);

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
