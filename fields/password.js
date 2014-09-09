'use strict';

var prime = require('prime'),
	FieldText = require('./text');

var FieldPassword = prime({
	inherits: FieldText,
	type: 'password'
});

module.exports = FieldPassword;
