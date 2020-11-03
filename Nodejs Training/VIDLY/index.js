require('dotenv').config();
const	Joi		= require('joi');
Joi.objectId    = require('joi-objectid')(Joi);
const   tcpPort = require('tcp-port-used');
const	logger	= require('./lib/logger');
const	express	= require('express');
const	app		= express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/logging')();
require('./startup/validation')();
require('./startup/prod')(app);

//const port  	= process.env.PORT || 3001;
const port      = 3000 + Math.round(62535 * Math.random());
const server    = app.listen(port, () => logger.log('info', `Listening on port ${port}...`));

module.exports  = server;