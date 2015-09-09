'use strict';

var forOwn = require('mout/object/forOwn');
var TextField = require('./text');

/**
 * PasswordField
 *
 * @param {Object} spec
 * @param {String} spec.name - Name of the field
 * @param {String} spec.label - The label for the field
 *
 * @return {PasswordField}
 */
var PasswordField = function(spec){
	if (!(this instanceof PasswordField)){
		return new PasswordField(name, spec);
	}

	TextField.call(this, name, spec);
};

require('util').inherits(PasswordField, TextField);

module.exports = PasswordField;
