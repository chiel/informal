'use strict';

var FieldText = require('./text');

/**
 * @param {Object} spec
 * @param {String} value
 */
var FieldTime = function(spec, value){
	if (!(this instanceof FieldTime)){
		return new FieldTime(spec, value);
	}
	FieldText.call(this, spec, value);
	this.type = 'time';
};

FieldTime.prototype = Object.create(FieldText.prototype);
FieldTime.prototype.constructor = FieldTime;

module.exports = FieldTime;
