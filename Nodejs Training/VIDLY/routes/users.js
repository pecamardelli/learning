const	auth				= require('../middleware/middle_auth');
const	jwt					= require('jsonwebtoken');
const	config				= require('config');
const	jpc					= require('joi-password-complexity');
const	bcrypt				= require('bcrypt');
const	_					= require('lodash');
const	{ User, validate }	= require('../models/model_user');
const	mongoose			= require('mongoose');
const	express				= require('express');

const router	= express.Router();

router.get('/me', auth, async (req, res) => {
	const user	= await User.findById(req.body._id).select('-password');
	res.send(user);
});

router.post('/', async (req, res) => {
	// Check the validity of the received data. If invalid, return a 400 error.
	const { error }	= validate(req.body);		// We only need the error object.
	
	if (error) return res.status(400).send(error.details[0].message);
	
	let user	= await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('The user is already registered.');
	
	const jpc_res	= jpc().validate(req.body.password);
	console.log(jpc_res);
	if (jpc_res.error) return res.status(400).send(jpc_res.error.details[0].message);

	user 			= new User(_.pick(req.body, [ 'name', 'email', 'password' ]));
	const salt		= await bcrypt.genSalt(10);
	user.password	= await bcrypt.hash(user.password, salt);
	
	await user.save();
	const token	= user.generateAuthToken();
	res.header('x-auth-token', token).send(_.pick(user, [ '_id', 'name', 'email' ]));
});

module.exports	= router;