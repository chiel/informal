'use strict';

var informal = require('./form');
informal.tabs = {
	default: require('./tabs/default')
};
informal.groups = {
	default: require('./groups/default')
};
informal.fields = {
	single_option: require('./fields/single_option'),
	text: require('./fields/text'),
	textarea: require('./fields/textarea')
};
module.exports = informal;
