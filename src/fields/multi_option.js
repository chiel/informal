'use strict';

var Base = require('./base');

/**
 * Multi Option input
 * @param {Object} spec
 * @param {String} value
 */
var MultiOption = function(spec, value){
	if (!(this instanceof MultiOption)) return new MultiOption(spec, value);
	this.tag = 'select';
	this.styles = ['select', 'checkbox'];
	this.style = spec.style || 'select';

	if (this.styles.indexOf(this.style) == -1){
		console.error('Undefined multi_option style `%s`', this.style);
	}

	Base.call(this, spec, value);
};

require('inherits')(MultiOption, Base);

/**
 * Multi Option specific
 */
MultiOption.prototype.build = function(){
	if (this.style == 'select'){
		this.buildSelect();
	} else if (this.style == 'checkbox'){
		this.buildCheckbox();
	}
};

/**
 * Build a select box
 */
MultiOption.prototype.buildSelect = function(){
	Base.prototype.build.call(this);

	this.input.setAttribute('multiple', true);
	this.input.setAttribute('name', this.spec.name + '[]');

	var opts = this.spec.options, i, opt;
	if (opts && opts.length){
		for (i = 0; i < opts.length; i++){
			opt = opts[i];
			this.input.innerHTML += this.buildSelectOption(opt.value, opt.label);
		}
	}
};

MultiOption.prototype.buildSelectOption = function(value, label){
	return '<option' +
		' value="' + value + '"' +
		((this.value || this.spec.value || []).indexOf(value) != -1 ? ' selected' : '') +
		'>' +
		(label || value) +
		'</option>';
};

/**
 * Build checkboxes
 */
MultiOption.prototype.buildCheckbox = function(){
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
			fieldset.innerHTML += this.buildCheckboxOption(opt.value, opt.label);
		}
	}

	this.fieldset = fieldset;
	this.inputs = fieldset.querySelectorAll('input');

	this.wrap.appendChild(label);
	this.wrap.appendChild(fieldset);
};

MultiOption.prototype.buildCheckboxOption = function(value, label){
	return '<label>' +
		'<input type="checkbox" name="' + this.spec.name + '[]"' +
		' value="' + value + '"' +
		(this.spec.required ? ' required' : '') +
		((this.value || this.spec.value) == value ? ' checked' : '') +
		'><span>' + (label || value) + '</span></label>';
};

/**
 * Add events to the input
 */
MultiOption.prototype.setEvents = function(){
	var self = this;

	if (this.style == 'select'){
		this.input.addEventListener('change', function(){
			self.emit('change', self.getValue());
		});
	} else if (this.style == 'checkbox') {
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
MultiOption.prototype.getValue = function(){
	var value = [], i;

	if (this.style == 'select'){
		var opts = this.input.querySelectorAll('option');
		for (i = 0; i < opts.length; i++){
			if (opts[i].selected){
				value.push(opts[i].value);
			}
		}
	} else if (this.style == 'checkbox'){
		for (i = 0; i < this.inputs.length; i++){
			if (this.inputs[i].checked){
				value.push(this.inputs[i].value);
			}
		}
	}

	return value;
};

module.exports = MultiOption;
