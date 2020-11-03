
const Logger	= require('./logger');
const path		= require('path');
const os		= require('os');
const fs		= require('fs');
const http		= require('http');

const EventEmitter	= require('events');	// In this case, require retunrs a CLASS, that's why the first letter of the variable name is also uppercase
const emitter		= new EventEmitter();	// We instantiate the class previously defined.
/*
// Path module example
var	pathObj	= path.parse(__filename);
log(pathObj);

// OS module example
var totalMem	= os.totalmem();
var freeMem		= os.freemem();
log(`Total memory: ${totalMem} - Free memory: ${freeMem}`);

// FS module example

// Synchronous call
var files	= fs.readdirSync('./');
log(files);

// Asynchronous call
fs.readdir('./', function(err, files){
	if(err) console.log('Error', err);
	else	console.log('Result:', files);
});

// Register a listener
const logger	= new Logger();

logger.on('messageLogged', (arg) => {
	console.log('Listener called', arg);
});

logger.log('message');
*/

const server	= http.createServer((req, res) => {
	if (req.url === '/') {
		res.write('Hello world!');
		res.end();
	}
	
	if (req.url === '/api/courses') {
		res.write(JSON.stringify([1, 2, 3]));
		res.end();
	}
});

/*
server.on('connection', (socket) => {
	console.log('New connection...');
});
*/

server.listen(3000);

console.log('Listening on port 3000');
