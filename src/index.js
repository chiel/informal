'use strict';

var pagers = require('./pagers'),
	pages = require('./pages'),
	groups = require('./groups'),
	fields = require('./fields');

module.exports = {
	Form: require('./form'),
	pagers: pagers,
	pages: pages,
	groups: groups,
	fields: fields,
	registerPager: function(type, definition){
		pagers[type] = definition;
	},
	registerPage: function(type, definition){
		pages[type] = definition;
	},
	registerGroup: function(type, definition){
		groups[type] = definition;
	},
	registerField: function(type, definition){
		fields[type] = definition;
	}
};
