const mongoose	= require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
	.then(() => console.log('Connected to database mongo-exercises'))
	.catch(err => console.log('Some shit has happened:', err));

const courseSchema	= new mongoose.Schema({
	name:			String,
	author:			String,
	tags:			[ String ],
	date:			Date,
	isPublished:	Boolean,
	price:			Number
});

const	Course	= mongoose.model('Course', courseSchema);

async function getCourses() {
	return await Course
		.find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
		.sort({ price: -1 })
		.select({ name: 1, author: 1, price: 1 });
	
	console.log(result);
}

async function run() {
	const courses	= await getCourses();
	console.log(courses);
}

run();