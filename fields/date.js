'use strict';

var inherits = require('inherits'),
	FieldText = require('./text');

var FieldDate = function(spec, value){
	if (!(this instanceof FieldDate)){
		return new FieldDate(spec, value);
	}
	FieldText.call(this, spec, value);

	this.type = 'date';
};

inherits(FieldDate, FieldText);

module.exports = FieldDate;
