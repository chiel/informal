'use strict';

var prime = require('prime'),
	FieldText = require('./text');

var FieldDate = prime({
	inherits: FieldText,
	type: 'date'
});

module.exports = FieldDate;
