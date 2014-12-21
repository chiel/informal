'use strict';

var inherits = require('inherits'),
	FieldText = require('./text');

var FieldNumber = function(spec, value){
	if (!(this instanceof FieldNumber)){
		return new FieldNumber(spec, value);
	}
	FieldText.call(this, spec, value);

	this.type = 'number';
};

inherits(FieldNumber, FieldText);

module.exports = FieldNumber;
