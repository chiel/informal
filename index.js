'use strict';

var pageTypes = require('./pages'),
	groupTypes = require('./groups'),
	fieldTypes = require('./fields');

pageTypes.register('main', require('./pages/main'));
groupTypes.register('main', require('./groups/main'));
fieldTypes.register('text', require('./fields/text'));

module.exports = {
	Form: require('./form')
};

