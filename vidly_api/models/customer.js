const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model(
	'Customer',
	new mongoose.Schema({
		name: {
			type: String,
			minlength: 3,
			required: true,
		},
		phone: {
			type: String,
			minlength: 8,
			required: true,
		},
		isGold: {
			type: Boolean,
			default: false,
		},
	})
);

function validateCustomer(customer) {
	const schema = {
		name: Joi.string()
			.min(3)
			.required(),
		phone: Joi.string()
			.min(8)
			.required(),
		isGold: Joi.boolean(),
	};
	return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
