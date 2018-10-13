const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/user');

const router = express.Router();

const validateLogin = user => {
	const schema = {
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

router.post('/', async (req, res) => {
	const { error } = validateLogin(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('INVALID EMAIL OR PASSWORD');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('INVALID EMAIL OR PASSWORD');

	const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
	res.send(token);
});

module.exports = router;