const	express	= require('express');
const	router	= express.Router();

// Definition of courses array
const	courses	= [
	{ id: 1, name: 'course1' },
	{ id: 2, name: 'course2' },
	{ id: 3, name: 'course3' },
];

router.get('/', (req, res) => {
	res.send(courses);
});

router.get('/:id', (req, res) => {
	const course	= courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('The requested ID was not found.');
	res.send(course);
});

router.post('/', (req, res) => {
	// Check the validity of the inputted data. If invalid, return a 400 error.
	const { error }	= validateCourse(req.body);		// We only need the error object.
	
	if (error) return res.status(400).send(result.error.details[0].message);
	
	const course	= {
		id: courses.length + 1,
		name: req.body.name,
	};
	
	courses.push(course);
	res.send(course);
});

router.put('/:id', (req, res) => {
	// First, we check if the course exists. If not, return a 404 error.
	const course	= courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('The requested ID was not found.');
	
	// Second, we check the validity of the input data. If invalid, return a 400 error.
	const { error }	= validateCourse(req.body);		// We only need the error object.
	
	if (error) return res.status(400).send(result.error.details[0].message);
	
	// Everything looks good. Update the course
	course.name	= req.body.name;
	res.send(course);
});

router.delete('/:id', (req, res) => {
	// First, we check if the course exists. If not, return a 404 error.
	const course	= courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('The requested ID was not found.');
	
	// Now we get the course index on the array and we delete it.
	const index		= courses.indexOf(course);
	courses.splice(index, 1);
	
	// Finally, return the course object to comply with convections.
	res.send(course);
});

function validateCourse(course) {
	const schema	= Joi.object({
		name: Joi.string().min(3).required()
	});
	
	return schema.validate(course);
}

module.exports	= router;