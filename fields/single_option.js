'use strict';

var forOwn = require('mout/object/forOwn');

/**
 * SingleOptionField
 *
 * @param {Object} spec
 * @param {String} spec.name - Name of the field
 * @param {String} spec.label - The label for the field
 * @param {Array} spec.options - Options for the single option field
 */
var SingleOptionField = function(spec, value){
	this.spec = spec;
	this.value = value;
	this.build();
};

require('util').inherits(SingleOptionField, require('events').EventEmitter);

/**
 * Build the field
 */
SingleOptionField.prototype.build = function(){
	if (this.wrap) return;

	var wrap = document.createElement('div');
	wrap.classList.add('informal-field');

	if (this.spec.label){
		var label = document.createElement('label');
		label.textContent = this.spec.label;
		wrap.appendChild(label);

		if (this.spec.style === 'radio'){
			var clearBtn = document.createElement('button');
			clearBtn.type = 'button';
			clearBtn.tabIndex = -1;
			clearBtn.textContent = 'clear selection';
			label.appendChild(clearBtn);
			this.clearBtn = clearBtn;
		}
	}

	var inputWrap = document.createElement('div');
	inputWrap.classList.add('informal-input');
	wrap.appendChild(inputWrap);
	this.inputWrap = inputWrap;

	if (this.spec.style === 'radio'){
		this.buildRadioButtons();
	} else{
		this.buildSelect();
	}

	this.wrap = wrap;
	this.setEvents();
};

/**
 * Build select-style input
 */
SingleOptionField.prototype.buildSelect = function(){
	var input = document.createElement('select');
	input.name = this.spec.name;
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
 * Populate select input with given options
 *
 * @param {Object[]} options
 */
SingleOptionField.prototype.buildSelectOptions = function(options){
	if (!options) return;

	this.options = [];

	var opt, option;
	for (var i = 0; i < options.length; i++){
		opt = options[i];
		option = document.createElement('option');
		option.value = opt.value || opt.label;
		option.textContent = opt.label || opt.value;
		option.selected = this.value === (opt.value || opt.label);
		this.options.push(option);
		this.input.appendChild(option);
	}
};

/**
 *
 */
SingleOptionField.prototype.buildRadioButtons = function(){
	var fieldset = document.createElement('fieldset');
	fieldset.classList.add('informal-input-options');
	this.inputWrap.appendChild(fieldset);
	this.fieldset = fieldset;

	this.buildRadioButtonOptions(this.spec.options);
};

/**
 *
 */
SingleOptionField.prototype.buildRadioButtonOptions = function(options){
	if (!options) return;

	this.inputs = [];

	var opt, label, input, span;
	for (var i = 0; i < options.length; i++){
		opt = options[i];
		label = document.createElement('label');

		input = document.createElement('input');
		input.type = 'radio';
		input.name = this.spec.name;
		input.value = opt.value || opt.label;
		input.checked = this.value === (opt.value || opt.label);
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
SingleOptionField.prototype.setEvents = function(){
	var self = this;

	if (self.clearBtn){
		self.clearBtn.addEventListener('click', function(e){
			self.clear();
		});
	}

	self.inputWrap.addEventListener('change', function(){
		self.emit('change', self.getValue());
	});
};

/**
 * Clear selection
 */
SingleOptionField.prototype.clear = function(){
	if (this.spec.style === 'radio'){
		for (var i = 0; i < this.inputs.length; i++){
			this.inputs[i].checked = false;
		}
	} else{
		this.input.selectedIndex = -1;
	}

	this.emit('change', '');
};

/**
 * Get value for field
 */
SingleOptionField.prototype.getValue = function(){
	if (this.spec.style === 'radio'){
		for (var i = 0; i < this.inputs.length; i++){
			if (this.inputs[i].checked) return this.inputs[i].value;
		}
	} else{
		return this.input.value;
	}
};

module.exports = SingleOptionField;
