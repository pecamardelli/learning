require('express-async-errors');
const	logger		= require('../lib/logger');

module.exports	= function() {
	process.on('uncaughtException', (ex) => {
		logger.error(ex.message, ex);
		// Terminate the process... We don't want to keep running the application in an unclean state.
		process.exit(1);
	});
	
	process.on('unhandledRejection', (ex) => {
		logger.error(ex.message, ex);
		// Terminate the process... We don't want to keep running the application in an unclean state.
		process.exit(1);
	});
}
