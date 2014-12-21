'use strict';

var inherits = require('inherits'),
	FieldText = require('./text');

var FieldTime = function(spec, value){
	if (!(this instanceof FieldTime)){
		return new FieldTime(spec, value);
	}
	FieldText.call(this, spec, value);

	this.type = 'time';
};

inherits(FieldTime, FieldText);

module.exports = FieldTime;
