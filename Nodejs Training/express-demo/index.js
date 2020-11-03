const	startupDebugger	= require('debug')('app:startup');
const	dbDebugger		= require('debug')('app:db');
const	config			= require('config');
const	morgan			= require('morgan');
const	helmet			= require('helmet');
const	Joi				= require('joi');
const	courses			= require('./routes/courses');
const	home			= require('./routes/home');
const	express			= require('express');
const	logger			= require('./middleware/logger');
const	auth			= require('./auth');
const	app				= express();

app.set('view engine', 'pug');
app.set('views', './views');		// Default folder for views

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// Let's read some configuration.
console.log(`Application name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
	app.use(morgan('tiny'));
	startupDebugger('Morgan enabled...');
}

// DB work...
dbDebugger('Connected to database.');

app.use(logger);
app.use(auth);

// Check if PORT is defined. Otherwise, we'll use port 3000.
const	port	= process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening no port ${port}...`));