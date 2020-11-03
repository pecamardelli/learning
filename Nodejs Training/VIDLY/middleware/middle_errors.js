const	logger	= require('../lib/logger');

module.exports	= function(err, req, res, next) {
	// Send a 500 error: Internal Server Error.
	logger.log('error', err.message);
	res.status(500).send('Some shit has happened internally on the server.');
}