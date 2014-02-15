'use strict';

var prime = require('prime'),
	FieldText = require('./text');

var FieldPassword = prime({
	inherits: FieldText,

	/**
	 * @param {Object} spec
	 * @param {String} value
	 */
	constructor: function(spec, value){
		if (!(this instanceof FieldPassword)){
			return new FieldPassword(spec, value);
		}
		FieldText.call(this, spec, value);
	}
});

module.exports = FieldPassword;
