
const EventEmitter	= require('events');	// In this case, require retunrs a CLASS, that's why the first letter of the variable name is also uppercase

var url	= 'http://mylogger.io/log';

class Logger extends EventEmitter {
	log(message){
		// Send HTTP request to remote log server
		// Not really, just log to the console
		console.log(message);
			
		// Register an event
		this.emit('messageLogged', {id: 1, 'url': 'http;//'});
	}
}

module.exports	= Logger;