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
	.register('password', require('./fields/password'))
	.register('number', require('./fields/number'))
	.register('date', require('./fields/date'))
	.register('time', require('./fields/time'))
	.register('boolean', require('./fields/boolean'))
	.register('single-option', require('./fields/single-option'))
	.register('multi-option', require('./fields/multi-option'));

module.exports = {
	Form: require('./form'),
	pages: {
		Base: require('./pages/base'),
		Default: require('./pages/default')
	},
	pagers: {
		Base: require('./pagers/base'),
		Default: require('./pagers/default'),
		Tabbed: require('./pagers/tabbed')
	},
	groups: {
		Base: require('./groups/base'),
		Default: require('./groups/default')
	},
	fields: {
		Base: require('./fields/base'),
		Text: require('./fields/text'),
		Textarea: require('./fields/textarea'),
		Email: require('./fields/email'),
		Password: require('./fields/password'),
		Number: require('./fields/number'),
		Date: require('./fields/date'),
		Time: require('./fields/time'),
		Boolean: require('./fields/boolean'),
		SingleOption: require('./fields/single-option'),
		MultiOption: require('./fields/multi-option')
	},
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
