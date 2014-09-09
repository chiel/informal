'use strict';

var prime = require('prime'),
	FieldText = require('./text');

var FieldTime = prime({
	inherits: FieldText,
	type: 'time'
});

module.exports = FieldTime;
