const mongoose	= require('mongoose');
const config	= require('config');
const logger	= require('../lib/logger');

module.exports	= function() {
	const db	= config.get('db');
	mongoose.connect(db)
		.then(() => logger.log('info', `Connected to ${db}.`));
}
