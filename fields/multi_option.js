'use strict';

var forOwn = require('mout/object/forOwn');

/**
 * MultiOptionField
 *
 * @param {String} name
 * @param {Object} spec
 * @param {String} spec.name - Name of the field if you want to change it
 * @param {String} spec.label - The label for the field
 * @param {Array} spec.options - Options for the multi option field
 *
 * @return {MultiOptionField}
 */
var MultiOptionField = function(name, spec){
	if (!(this instanceof MultiOptionField)){
		return new MultiOptionField(spec);
	}

	this.name = name;
	this.spec = spec;
	this.build();
};

/**
 * Build the field
 */
MultiOptionField.prototype.build = function(){
	if (this.wrap) return;

	var wrap = document.createElement('div');
	wrap.classList.add('informal-field');

	var label = document.createElement('label');
	label.textContent = this.spec.label;
	wrap.appendChild(label);

	var clearBtn = document.createElement('button');
	clearBtn.type = 'button';
	clearBtn.tabIndex = -1;
	clearBtn.textContent = 'clear selection';
	label.appendChild(clearBtn);
	this.clearBtn = clearBtn;

	var inputWrap = document.createElement('div');
	inputWrap.classList.add('informal-input');
	wrap.appendChild(inputWrap);
	this.inputWrap = inputWrap;

	if (this.spec.style === 'checkbox'){
		this.buildCheckboxes();
	} else{
		this.buildSelect();
	}

	this.wrap = wrap;
	this.setEvents();
};

/**
 *
 */
MultiOptionField.prototype.buildSelect = function(){
	var input = document.createElement('select');
	input.name = this.spec.name || this.name;
	input.multiple = true;
	this.inputWrap.appendChild(input);

	if (this.spec.attributes){
		forOwn(this.spec.attributes, function(value, attribute){
			input.setAttribute(attribute, value);
		});
	}

	this.input = input;

	this.buildSelectOptions(this.spec.options);
};

/**
 *
 */
MultiOptionField.prototype.buildCheckboxes = function(){
	var fieldset = document.createElement('fieldset');
	fieldset.classList.add('informal-input-options');
	this.inputWrap.appendChild(fieldset);
	this.fieldset = fieldset;

	this.buildCheckboxOptions(this.spec.options);

};

/**
 *
 */
MultiOptionField.prototype.buildOptions = function(options){
	if (this.spec.style === 'checkbox'){
		this.buildCheckboxOptions(options);
	} else{
		this.buildSelectOptions(options);
	}
};

/**
 *
 */
MultiOptionField.prototype.buildSelectOptions = function(options){
	if (!options) return;

	var opt;
	var option;
	for (var i = 0; i < options.length; i++){
		opt = options[i];
		option = document.createElement('option');
		option.value = opt.value || opt.label;
		option.textContent = opt.label || opt.value;
		this.input.appendChild(option);
	}
};

/**
 *
 */
MultiOptionField.prototype.buildCheckboxOptions = function(options){
	if (!options) return;

	this.inputs = [];

	var opt;
	var label;
	var input;
	var span;
	for (var i = 0; i < options.length; i++){
		opt = options[i];
		label = document.createElement('label');

		input = document.createElement('input');
		input.type = 'checkbox';
		input.value = opt.value || opt.label;
		this.inputs.push(input);

		span = document.createElement('span');
		span.textContent = opt.label || opt.value;

		label.appendChild(input);
		label.appendChild(span);
		this.fieldset.appendChild(label);
	}
};

/**
 * Set events
 */
MultiOptionField.prototype.setEvents = function(){
	var self = this;

	self.clearBtn.addEventListener('click', function(e){
		self.clear();
	});
};

/**
 * Clear selection
 */
MultiOptionField.prototype.clear = function(){
	if (this.spec.style === 'checkbox'){
		for (var i = 0; i < this.inputs.length; i++){
			this.inputs[i].checked = false;
		}
	} else{
		this.input.selectedIndex = -1;
	}
};

module.exports = MultiOptionField;
