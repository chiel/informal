'use strict';

var FieldText = require('./text');

/**
 * @param {Object} spec
 * @param {String} value
 */
var FieldDate = function(spec, value){
	if (!(this instanceof FieldDate)){
		return new FieldDate(spec, value);
	}
	FieldText.call(this, spec, value);
	this.type = 'date';
};

FieldDate.prototype = Object.create(FieldText.prototype);
FieldDate.prototype.constructor = FieldDate;

module.exports = FieldDate;
