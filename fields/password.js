'use strict';

var prime = require('prime'),
	FieldText = require('./text');

var FieldPassword = prime({
	inherits: FieldText,

	constructor: function(spec){
		if (!(this instanceof FieldPassword)){
			return new FieldPassword(spec);
		}
		FieldText.call(this, spec);
		this.type = 'password';
	}
});

module.exports = FieldPassword;
