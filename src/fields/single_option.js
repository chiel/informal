'use strict';

var Base = require('./base');

/**
 * Single Option input
 * @param {Object} spec
 * @param {String} value
 */
var SingleOption = function(spec, value){
	if (!(this instanceof SingleOption)) return new SingleOption(spec, value);
	this.tag = 'select';
	this.styles = ['select', 'radio'];
	this.style = spec.style || 'select';

	if (this.styles.indexOf(this.style) == -1){
		console.error('Undefined single_option style `%s`', this.style);
	}

	Base.call(this, spec, value);
};

require('inherits')(SingleOption, Base);

/**
 * Single Option specific
 */
SingleOption.prototype.build = function(){
	if (this.style == 'select'){
		this.buildSelect();
	} else if (this.style == 'radio'){
		this.buildRadio();
	}
};

/**
 * Build a select box
 */
SingleOption.prototype.buildSelect = function(){
	Base.prototype.build.call(this);

	var attr = this.spec.attributes;
	this.input.innerHTML += this.buildSelectOption('', attr && attr.placeholder ? attr.placeholder : '&hellip;');

	var opts = this.spec.options, i, opt;
	if (opts && opts.length){
		for (i = 0; i < opts.length; i++){
			opt = opts[i];
			this.input.innerHTML += this.buildSelectOption(opt.value, opt.label);
		}
	}
};

SingleOption.prototype.buildSelectOption = function(value, label){
	return '<option' +
		' value="' + value + '"' +
		((this.value || this.spec.value) == value ? ' selected' : '') +
		'>' +
		(label || value) +
		'</option>';
};

/**
 * Build radio buttons
 */
SingleOption.prototype.buildRadio = function(){
	this.wrap = document.createElement('div');
	this.wrap.classList.add('informal--field');

	var label = document.createElement('label'),
		fieldset = document.createElement('fieldset');

	if (this.spec.label){
		label.innerHTML = this.spec.label;
	}

	var opts = this.spec.options, i, opt;
	if (opts && opts.length){
		for (i = 0; i < opts.length; i++){
			opt = opts[i];
			fieldset.innerHTML += this.buildRadioOption(opt.value, opt.label);
		}
	}

	this.fieldset = fieldset;
	this.inputs = fieldset.querySelectorAll('input');

	this.wrap.appendChild(label);
	this.wrap.appendChild(fieldset);
};

SingleOption.prototype.buildRadioOption = function(value, label){
	return '<label>' +
		'<input type="radio" name="' + this.spec.name + '"' +
		' value="' + value + '"' +
		(this.spec.required ? ' required' : '') +
		((this.value || this.spec.value) == value ? ' checked' : '') +
		'><span>' + (label || value) + '</span></label>';
};

/**
 * Add events to the input
 */
SingleOption.prototype.setEvents = function(){
	var self = this;

	if (this.style == 'select'){
		this.input.addEventListener('change', function(){
			self.emit('change', self.getValue());
		});
	} else if (this.style == 'radio') {
		var change = function(){
			self.emit('change', self.getValue());
		}, i;

		for (i = 0; i < this.inputs.length; i++){
			this.inputs[i].addEventListener('change', change);
		}
	}
};

/**
 * Get this field's value
 * @return {String}
 */
SingleOption.prototype.getValue = function(){
	if (this.style == 'select'){
		return this.input.value;
	} else if (this.style == 'radio'){
		var i, input;
		for (i = 0; i < this.inputs.length; i++){
			input = this.inputs[i];
			if (input.checked){
				return input.value;
			}
		}
	}
};

module.exports = SingleOption;
