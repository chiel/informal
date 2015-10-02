'use strict';

var forOwn = require('mout/object/forOwn');
var TextField = require('./text');

/**
 * PasswordField
 *
 * @param {Object} spec
 * @param {String} spec.name - Name of the field
 * @param {String} spec.label - The label for the field
 */
var PasswordField = function(spec) {
	TextField.call(this, spec);
};

require('util').inherits(PasswordField, TextField);

module.exports = PasswordField;
