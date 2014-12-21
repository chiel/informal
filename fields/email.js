'use strict';

var inherits = require('inherits'),
	FieldText = require('./text');

var FieldEmail = function(spec, value){
	if (!(this instanceof FieldEmail)){
		return new FieldEmail(spec, value);
	}
	FieldText.call(this, spec, value);

	this.type = 'email';
};

inherits(FieldEmail, FieldText);

module.exports = FieldEmail;
