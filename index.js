'use strict';

var pages = require('./pages'),
	pagers = require('./pagers'),
	groups = require('./groups'),
	fields = require('./fields');

pages.register('default', require('./pages/default'));
pagers
	.register('default', require('./pagers/default'))
	.register('tabbed', require('./pagers/tabbed'));
groups.register('default', require('./groups/default'));
fields
	.register('text', require('./fields/text'))
	.register('email', require('./fields/email'))
	.register('password', require('./fields/password'));

module.exports = {
	Form: require('./form')
};
