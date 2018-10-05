const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const Customer = mongoose.model(
	'Customer',
	new mongoose.Schema({
		name: {
			type: String,
			minlength: 3,
			required: true
		},
		phone: {
			type: String,
			minlength: 8,
			required: true
		},
		isGold: {
			type: Boolean,
			default: false
		}
	})
);

router.get('/', async (req, res) => {
	const customers = await Customer.find().sort('name');
	res.send(customers);
});

router.get('/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id).catch(err => {
		return res.status(404).send('404, customer not found');
	});
	if (!customer) return res.status(404).send('404, customer not found');

	res.send(customer);
});

router.post('/', async (req, res) => {
	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let newCustomer = new Customer({ ...req.body });
	newCustomer = await newCustomer.save();

	res.send(newCustomer);
});

router.put('/:id', async (req, res) => {
	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(
		req.params.id,
		{
			...req.body
		},
		{ new: true }
	);

	if (!customer) return res.status(404).send('404, customer not found');
	res.send(customer);
});

router.delete('/:id', async (req, res) => {
	const customer = await Customer.findByIdAndRemove(req.params.id);
	if (!customer) return res.status(404).send('404, customer not found');

	res.send(customer);
});

function validateCustomer(customer) {
	const schema = {
		name: Joi.string()
			.min(3)
			.required(),
		phone: Joi.string()
			.min(8)
			.required(),
		isGold: Joi.boolean()
	};
	return Joi.validate(customer, schema);
}

module.exports = router;
