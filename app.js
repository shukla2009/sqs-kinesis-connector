'use strict';
var config = require('./config');
var logger = require('./logger')(module);
logger.info(JSON.stringify(config));