'use strict';

var forOwn = require('mout/object/forOwn');

/**
 * TextField
 *
 * @param {Object} spec
 * @param {String} spec.name - Name of the field
 * @param {String} spec.label - The label for the field
 * @param {String} value
 */
var TextField = function(spec, value) {
	spec.attributes.type = spec.type;

	this.spec = spec;
	this.value = value;
	this.build();
};

require('util').inherits(TextField, require('events').EventEmitter);

/**
 * Build the field
 */
TextField.prototype.build = function() {
	if (this.wrap) return;

	var wrap = document.createElement('div');
	wrap.classList.add('informal__field');

	if (this.spec.label) {
		var label = document.createElement('label');
		label.classList.add('informal__label');
		label.textContent = this.spec.label;
		wrap.appendChild(label);
	}

	var inputWrap = document.createElement('div');
	inputWrap.classList.add('informal__input');
	wrap.appendChild(inputWrap);

	var input = document.createElement('input');
	input.name = this.spec.name;
	input.value = this.value || '';
	inputWrap.appendChild(input);

	if (this.spec.attributes) {
		forOwn(this.spec.attributes, function(value, attribute) {
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
TextField.prototype.setEvents = function() {
	var self = this;

	self.input.addEventListener('input', function() {
		self.emit('change', self.input.value);
	});
};

/**
 * Returns the current value of the input
 */
TextField.prototype.getValue = function() {
	return this.input.value;
};

module.exports = TextField;
