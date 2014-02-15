'use strict';

var prime = require('prime'),
	indexOf = require('mout/array/indexOf'),
	FieldBase = require('./base');

var FieldSingleOption = prime({
	inherits: FieldBase,
	styles: ['select', 'radio'],

	/**
	 * @param {Object} spec
	 */
	constructor: function(spec){
    if (!(this instanceof FieldSingleOption)){
			return new FieldSingleOption(spec);
		}
		FieldBase.call(this, spec);

		this.style = this.spec.style || 'select';
		if (indexOf(this.styles, this.style) == -1){
			throw new Error('Invalid style selected');
		}
	},

	/**
	 *
	 */
	toHTML: function(){
		var html = '<li>';
		if (this.spec.label){
			html += '<label>' + this.spec.label + '</label>';
		}

		switch (this.style){
			case 'select': html += this.selectToHTML(); break;
			case 'radio': html += this.radioToHTML(); break;
		}

		html += '</li>';
		return html;
	},

	/**
	 *
	 */
	selectToHTML: function(){
		var html, i, opt;
		html = '<select>';
		html += '<option value="">...</option>';

		for (i = 0; i < this.spec.options.length; i++){
			opt = this.spec.options[i];
			html += '<option value="' + opt.value + '">' + opt.text + '</option>';
		}

		html += '</select>';
		return html;
	},

	/**
	 *
	 */
	radioToHTML: function(){
		var html, i, opt;
		html = '<fieldset class="options"><ul>';

		for (i = 0; i < this.spec.options.length; i++){
			opt = this.spec.options[i];
			html += '<li><input type="radio" value="' + opt.value + '">';
			html += '<label>' + opt.text + '</label></li>';
		}

		html += '</ul></fieldset>';
		return html;
	}
});

module.exports = FieldSingleOption;
