'use strict';

var forOwn = require('mout/object/forOwn');
var TextField = require('./text');

/**
 * EmailField
 *
 * @param {String} name
 * @param {Object} spec
 * @param {String} spec.name - Name of the field if you want to change it
 * @param {String} spec.label - The label for the field
 *
 * @return {EmailField}
 */
var EmailField = function(name, spec){
	if (!(this instanceof EmailField)){
		return new EmailField(name, spec);
	}

	TextField.call(this, name, spec);
};

require('util').inherits(EmailField, TextField);

module.exports = EmailField;
