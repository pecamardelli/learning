const	admin				= require('../middleware/middle_admin');
const	auth				= require('../middleware/middle_auth');
const	validateObjectId	= require('../middleware/middle_validateObjectId');
const	{ Genre, validate }	= require('../models/model_genre');
const	express				= require('express');

const router	= express.Router();

router.get('/', async (req, res) => {
	const genres	= await Genre.find().sort('name');
	res.send(genres);
});

/*
router.get('/:id', (req, res) => {
	const genre	= genres.find(c => c.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send('The requested ID was not found.');
	res.send(genre);
});
*/

router.post('/', auth, async (req, res) => {
	// Check the validity of the inputted data. If invalid, return a 400 error.
	const { error }	= validate(req.body);		// We only need the error object.
	
	if (error) return res.status(400).send(error.details[0].message);
	
	let genre	= new Genre({ name: req.body.name });
	genre		= await genre.save();
	res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
	// Check the validity of the inputted data. If invalid, return a 400 error.
	const { error }	= validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const genre	= await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
		new: true
	});
	
	if (!genre) return res.status(404).send('The requested ID was not found.');

	res.send(genre);
});

router.delete('/:id', [ auth, admin ], async (req, res) => {
	const genre	= await Genre.findByIdAndRemove(req.params.id);
	if (!genre) return res.status(404).send('The requested ID was not found.');
	
	// Send the genre object to comply with conventions.
	res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {
	const genre	= await Genre.findById(req.params.id);
	if (!genre) return res.status(404).send('The requested ID was not found.');
	
	// Send the genre object to comply with convections.
	res.send(genre);
});

module.exports	= router;