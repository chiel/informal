'use strict';

var forOwn = require('mout/object/forOwn');
var TextField = require('./text');

/**
 * EmailField
 *
 * @param {Object} spec
 * @param {String} spec.name - Name of the field
 * @param {String} spec.label - The label for the field
 * @param {String} value
 */
var EmailField = function(spec, value) {
	TextField.call(this, spec, value);
};

require('util').inherits(EmailField, TextField);

module.exports = EmailField;
