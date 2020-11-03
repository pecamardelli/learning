const	admin				= require('../middleware/middle_admin');
const	auth				= require('../middleware/middle_auth');
const	{ Movie, validate }	= require('../models/model_movie');
const	express				= require('express');
const { Genre } = require('../models/model_genre');

const router	= express.Router();

router.get('/', async (req, res) => {
	const movies	= await Movie.find().sort('title');
	res.send(movies);
});

router.post('/', auth, async (req, res) => {
	// Check the validity of the inputted data. If invalid, return a 400 error.
	const { error }	= validate(req.body);		// We only need the error object.
	if (error) return res.status(400).send(error.details[0].message);

	const genre	= await Genre.findById(req.body.genreId);
	if(!genre) return res.status(400).send('Invalid genre...');

	let movie	= new Movie({
		title: req.body.title,
		genre: {
			_id: 	genre._id,
			name:	genre.name
		},
		numberInStock: 		req.body.numberInStock,
		dailyRentalRate:	req.body.dailyRentalRate
	 });

	movie		= await movie.save();
	res.send(movie);
});

router.put('/:id', async (req, res) => {
	// Check the validity of the inputted data. If invalid, return a 400 error.
	const { error }	= validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const movie	= await Movie.findByIdAndUpdate(req.params.id, { title: req.body.title }, {
		new: true
	});
	
	if (!movie) return res.status(404).send('The requested ID was not found.');

	res.send(movie);
});

router.delete('/:id', [ auth, admin ], async (req, res) => {
	const movie	= await Movie.findByIdAndRemove(req.params.id);
	if (!movie) return res.status(404).send('The requested ID was not found.');
	
	// Send the movie object to comply with convections.
	res.send(movie);
});

router.get('/:id', async (req, res) => {
	const movie	= await Movie.findById(req.params.id);
	if (!movie) return res.status(404).send('The requested ID was not found.');
	
	// Send the movie object to comply with convections.
	res.send(movie);
});

module.exports	= router;