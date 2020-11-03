const mongoose	= require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
	.then(() => console.log('Connected to mongodb database'))
	.catch(err => console.log('Some shit has happened: ', err));
	
const courseSchema	= new mongoose.Schema({
	name:			String,
	author:			String,
	tags:			[ String ],
	date:			String,
	isPublished:	Boolean,
	price:			Number
});

// This is a class. That's why we use Pascal case in here.
const Course	= mongoose.model('Course', courseSchema);

async function createCourse() {
	// And now we create an instance of the class and so we need to use camelCase notation.
	const course	= new Course({
		name:			'Angular.js Course',
		author:			'Pablin',
		tags:			['angular', 'frontend'],
		isPublished:	true
	});
	
	const result	= await course.save();
	console.log(`Course saved with id ${result}`);
}

async function getCourses() {
	const pageNumber	= 2;
	const pageSize		= 10;
	
	const result	= await Course
		.find({ author: 'Pablin', isPublished: true })
		.skip((pageNumber - 1) * pageSize)
		.limit(pageSize)
		.sort({ name: 1 })
		.select({ name: 1, tags: 1 });
	console.log(result);
}

async function updateCourse(id) {
	const course	= await Course.findById(id);
	
	if (!course) {
		console.log("We ain't find shit.'")
		return;
	}
	
	course.isPublished	= true;
	course.author		= 'Another author';
	
	const result		= await course.save();
	console.log(result);
}

//createCourse();
//getCourses();
updateCourse('5a68fdd7bee8ea64649c2777');















