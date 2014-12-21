'use strict';

var inherits = require('inherits'),
	FieldText = require('./text');

var FieldPassword = function(spec){
	if (!(this instanceof FieldPassword)){
		return new FieldPassword(spec);
	}
	FieldText.call(this, spec);

	this.type = 'password';
};

inherits(FieldPassword, FieldText);

module.exports = FieldPassword;
