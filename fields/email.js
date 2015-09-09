'use strict';

var forOwn = require('mout/object/forOwn');
var TextField = require('./text');

/**
 * EmailField
 *
 * @param {Object} spec
 * @param {String} spec.name - Name of the field
 * @param {String} spec.label - The label for the field
 *
 * @return {EmailField}
 */
var EmailField = function(spec){
	if (!(this instanceof EmailField)){
		return new EmailField(spec);
	}

	TextField.call(this, spec);
};

require('util').inherits(EmailField, TextField);

module.exports = EmailField;
