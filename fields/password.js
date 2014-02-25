'use strict';

var FieldText = require('./text');

/**
 * @param {Object} spec
 * @param {String} value
 */
var FieldPassword = function(spec, value){
	if (!(this instanceof FieldPassword)){
		return new FieldPassword(spec, value);
	}
	FieldText.call(this, spec, value);
	this.type = 'password';
};

FieldPassword.prototype = Object.create(FieldText.prototype);
FieldPassword.prototype.constructor = FieldPassword;

module.exports = FieldPassword;
