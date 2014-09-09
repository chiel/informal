'use strict';

var prime = require('prime'),
	FieldText = require('./text');

var FieldEmail = prime({
	inherits: FieldText,
	type: 'email'
});

module.exports = FieldEmail;
