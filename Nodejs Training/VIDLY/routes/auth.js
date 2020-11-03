const	Joi			= require('joi');
const	bcrypt		= require('bcrypt');
const	_			= require('lodash');
const	{ User }	= require('../models/model_user');
const	mongoose	= require('mongoose');
const	express		= require('express');

const router		= express.Router();

router.post('/', async (req, res) => {
	// Check the validity of the received data. If invalid, return a 400 error.
	const { error }	= validate(req.body);		// We only need the error object.
	
	if (error) return res.status(400).send(error.details[0].message);
	
	let user	= await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid user or password.');

	const validPassword	= await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid user or password.');
	
	const token	= user.generateAuthToken();
	res.send(token);
});

function validate(req) {
	const schema	= Joi.object({
		email: 		Joi.string().min(5).max(255).required().email(),
		password:	Joi.string().min(5).max(255).required()
	});
	
	return schema.validate(req);
}

module.exports	= router;