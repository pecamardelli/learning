const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
 	name: String,
	authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
	const	course		= await Course.update({ _id: courseId }, {
		$unset: {
			'author': ''
		}
	});
}

async function addAuthor(courseId, author) {
  const course  = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course  = await Course.findById(courseId);
  const author  = course.authors.id(authorId);
  author.remove();
  course.save();
}

removeAuthor('5f5ae152866a460d2c6f5905', '5f5aec6f8f11581c7ca9c0ec');
/*
addAuthor('5f5ae152866a460d2c6f5905', new Author({ name: 'Amy' }));

createCourse('Node Course 2', [
  new Author({ name: 'Mosh' }),
  new Author({ name: 'Pepin' })
]);
*/
//updateAuthor('5f4492bbe7196a33f0ab6f39');
