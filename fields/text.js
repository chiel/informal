'use strict';

var prime = require('prime'),
	isArray = require('mout/lang/isArray'),
	FieldBase = require('./base');

var FieldText = prime({
	inherits: FieldBase,

	/**
	 * @param {Object} spec
	 */
	constructor: function(spec, value){
		if (!(this instanceof FieldText)){
			return new FieldText(spec, value);
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
		html += '<input type="' + this.spec.type + '"';

		var classes = this.spec.attributes.class;
		if (!classes){
			classes = [];
		}
		if (!isArray(classes)){
			classes = [classes];
		}

		if (this.spec.required && !this.value){
			classes.push('error');
		}

		if (this.spec.name){
			html += ' name="' + this.spec.name + '"';
		}

		if (this.value || this.spec.value){
			html += ' value="' + (this.value || this.spec.value) + '"';
		}

		if (classes.length){
			html += ' class="' + classes.join(' ') + '"';
		}

		if (this.spec.required){
			html += ' required';
		}

		html += '></li>';
		return html;
	}
});

module.exports = FieldText;
