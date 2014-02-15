'use strict';

var prime = require('prime'),
	FieldText = require('./text');

var FieldEmail = prime({
	inherits: FieldText,

	/**
	 * @param {Object} spec
	 * @param {String} value
	 */
	constructor: function(spec, value){
		if (!(this instanceof FieldEmail)){
			return new FieldEmail(spec, value);
		}
		FieldText.call(this, spec, value);
	}
});

module.exports = FieldEmail;
