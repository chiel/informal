'use strict';

var pageTypes = require('./pages'),
	groupTypes = require('./groups'),
	fieldTypes = require('./fields');

pageTypes.register('main', require('./pages/main'));
groupTypes.register('main', require('./groups/main'));
fieldTypes.register('text', require('./fields/text'));
fieldTypes.register('email', require('./fields/email'));
fieldTypes.register('password', require('./fields/password'));
fieldTypes.register('single-option', require('./fields/single-option'));
fieldTypes.register('multi-option', require('./fields/multi-option'));

module.exports = {
	Form: require('./form')
};

