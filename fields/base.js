'use strict';

var prime = require('prime'),
	fieldIndex = 0;

var FieldBase = prime({
	/**
	 * @param {Object} spec
	 * @param {Mixed} value
	 */
	constructor: function(spec, value){
		this.index = fieldIndex++;
		this.spec = spec;
		this.value = value;

		this.spec.attributes = this.spec.attributes || {};
	},

	/**
	 *
	 */
	isValid: function(){
		return !this.spec.required || !!this.value;
	}
});

module.exports = FieldBase;
