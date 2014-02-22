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
	.register('textarea', require('./fields/textarea'))
	.register('email', require('./fields/email'))
	.register('password', require('./fields/password'));

module.exports = {
	Form: require('./form'),
	registerPage: function(type, definition){
		return pages.register(type, definition);
	},
	registerGroup: function(type, definition){
		return groups.register(type, definition);
	},
	registerField: function(type, definition){
		return fields.register(type, definition);
	}
};
