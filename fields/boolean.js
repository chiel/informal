'use strict';

var forOwn = require('mout/object/forOwn');

/**
 * BooleanField
 *
 * @param {Object} spec
 * @param {String} spec.name - Name of the field
 * @param {String} spec.label - The label for the field
 * @param {Boolean} value
 */
var BooleanField = function(spec, value){
	this.spec = spec;
	this.value = value;
	this.build();
};

require('util').inherits(BooleanField, require('events').EventEmitter);

/**
 * Build the field
 */
BooleanField.prototype.build = function(){
	if (this.wrap) return;

	var wrap = document.createElement('div');
	wrap.classList.add('informal-field');

	if (this.spec.label){
		var label = document.createElement('label');
		label.textContent = this.spec.label;
		wrap.appendChild(label);
	}

	var inputWrap = document.createElement('div');
	inputWrap.classList.add('informal-input');
	wrap.appendChild(inputWrap);

	var input = document.createElement('input');
	input.type = 'checkbox';
	input.name = this.spec.name;
	input.checked = this.value === true;
	inputWrap.appendChild(input);

	if (this.spec.attributes){
		forOwn(this.spec.attributes, function(value, attribute){
			input.setAttribute(attribute, value);
		});
	}

	this.inputWrap = inputWrap;
	this.input = input;
	this.wrap = wrap;
	this.setEvents();
};

/**
 * Set events
 */
BooleanField.prototype.setEvents = function(){
	var self = this;

	self.input.addEventListener('input', function(){
		self.emit('change', self.input.value);
	});
};

/**
 * Returns the current value of the input
 */
BooleanField.prototype.getValue = function(){
	return this.input.checked;
};

module.exports = BooleanField;
