'use strict';

var prime = require('prime'),
	FieldBase = require('./base');

var FieldText = prime({
	inherits: FieldBase,

	/**
	 * @param {Object} spec
	 */
	constructor: function(spec){
		if (!(this instanceof FieldText)){
			return new FieldText(spec);
		}
		FieldBase.call(this, spec);
	},

	/**
	 *
	 */
	toHTML: function(){
		var html = '<li>';
		if (this.spec.label){
			html += '<label>' + this.spec.label + '</label>';
		}
		html += '<input type="text"></li>';
		return html;
	}
});

module.exports = FieldText;

