'use strict';

var prime = require('prime'),
	FieldText = require('./text');

var FieldPassword = prime({
	inherits: FieldText,
	type: 'password',

	constructor: function(spec){
		if (!(this instanceof FieldPassword)){
			return new FieldPassword(spec);
		}
		FieldText.call(this, spec);
	}
});

module.exports = FieldPassword;
