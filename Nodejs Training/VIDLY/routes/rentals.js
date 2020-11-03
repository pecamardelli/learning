const admin					= require('../middleware/middle_admin');
const auth					= require('../middleware/middle_auth');
const { Rental, validate }	= require('../models/model_rental');
const express				= require('express');
const { Movie } 			= require('../models/model_movie');
const { Customer } 			= require('../models/model_customer');
const mongoose				= require('mongoose');
const Fawn					= require('fawn');
const { number } = require('joi');

Fawn.init(mongoose);

const router	= express.Router();

router.get('/', async (req, res) => {
	const rentals	= await Rental.find().sort('-dateOut');
	res.send(rentals);
});

router.post('/', async (req, res) => {
	// Check the validity of the inputted data. If invalid, return a 400 error.
	const { error }	= validate(req.body);		// We only need the error object.
	if (error) return res.status(400).send(error.details[0].message);

	const movie	= await Movie.findById(req.body.movieId);
	if(!movie) return res.status(400).send('Movie not found...');

	if(movie.numberInStock === 0) return res.status(400).send('Movie not available for rental.');

	const customer	= await Customer.findById(req.body.customerId);
	if(!customer) return res.status(400).send('Customer not found...');

	let rental	= new Rental({
		movie: {
			_id:				movie._id,
			title:				movie.title,
			dailyRentalRate:	movie.dailyRentalRate
		}, 			
		customer: {
			_id:	customer._id,
			name:	customer.name,
			phone:	customer.phone
		},
		rentalFee:	1
	});

	try {
		new Fawn.Task()
			.save('rentals', rental)
			.update('movies', { _id: movie._id }, {
				$inc: { numberInStock: -1 }
			})
			.run();

		res.send(rental);
	}
	catch (ex) {
		res.status(500).send('Internal server error...');
	}
});

module.exports	= router;