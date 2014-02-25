'use strict';

var FieldText = require('./text');

/**
 * @param {Object} spec
 * @param {String} value
 */
var FieldEmail = function(spec, value){
	if (!(this instanceof FieldEmail)){
		return new FieldEmail(spec, value);
	}
	FieldText.call(this, spec, value);
	this.type = 'email';
};

FieldEmail.prototype = Object.create(FieldText.prototype);
FieldEmail.prototype.constructor = FieldEmail;

module.exports = FieldEmail;
