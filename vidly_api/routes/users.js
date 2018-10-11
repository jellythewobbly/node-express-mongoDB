const express = require('express');
const { User, validate } = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('USER IS ALREADY REGISTERED');

	user = new User({ ...req.body });
	await user.save();

	res.send(user);
});

module.exports = router;
