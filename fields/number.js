'use strict';

var FieldText = require('./text');

/**
 * @param {Object} spec
 * @param {String} value
 */
var FieldNumber = function(spec, value){
	if (!(this instanceof FieldNumber)){
		return new FieldNumber(spec, value);
	}
	FieldText.call(this, spec, value);
	this.type = 'number';
};

FieldNumber.prototype = Object.create(FieldText.prototype);
FieldNumber.prototype.constructor = FieldNumber;

module.exports = FieldNumber;
