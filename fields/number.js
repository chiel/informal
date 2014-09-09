'use strict';

var prime = require('prime'),
	FieldText = require('./text');

var FieldNumber = prime({
	inherits: FieldText,
	type: 'number'
});

module.exports = FieldNumber;
