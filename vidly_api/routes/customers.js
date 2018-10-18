const express = require('express');
const { Customer, validate } = require('../models/customer');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', async (req, res) => {
	const customers = await Customer.find().sort('name');
	res.send(customers);
});

router.get('/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id).catch(err =>
		res.status(404).send('404, customer not found')
	);
	if (!customer) return res.status(404).send('404, customer not found');

	res.send(customer);
});

router.post('/', auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const newCustomer = new Customer({ ...req.body });
	await newCustomer.save();

	res.send(newCustomer);
});

router.put('/:id', auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(
		req.params.id,
		{ ...req.body },
		{ new: true }
	);

	if (!customer) return res.status(404).send('404, customer not found');
	res.send(customer);
});

router.delete('/:id', [auth, admin], async (req, res) => {
	const customer = await Customer.findByIdAndRemove(req.params.id);
	if (!customer) return res.status(404).send('404, customer not found');

	res.send(customer);
});

module.exports = router;
