'use strict';

var prime = require('prime'),
	FieldBase = require('./base');

var FieldEmail = prime({
	inherits: FieldBase,

	/**
	 * @param {Object} spec
	 * @param {String} value
	 */
	constructor: function(spec, value){
		if (!(this instanceof FieldEmail)){
			return new FieldEmail(spec);
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
		html += '<input type="email"></li>';
		return html;
	}
});

module.exports = FieldEmail;

