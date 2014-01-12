'use strict';

var prime = require('prime'),
	FieldBase = require('./base');

var FieldPassword = prime({
	inherits: FieldBase,

	/**
	 * @param {Object} spec
	 * @param {String} value
	 */
	constructor: function(spec, value){
		if (!(this instanceof FieldPassword)){
			return new FieldPassword(spec);
		}
		FieldBase.call(this, spec, value);
	},

	/**
	 *
	 */
	toHTML: function(){
		var html = '<li>';
		if (this.spec.label){
			html += '<label>' + this.spec.label + '</label>';
		}
		html += '<input type="password"></li>';
		return html;
	}
});

module.exports = FieldPassword;

